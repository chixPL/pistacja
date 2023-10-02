"""
[PL]
Pistacja - stacja pogodowa za pomocą Raspberry Pi
[EN]
Pistacja - a weather station with Raspberry Pi

Losto 2022
by: Jakub Rutkowski & Ania Fiń
[EN]
"""

# Standard imports
import math
import time
import atexit
import statistics

# Requirements (pip install -r requirements.txt)
import board
from gpiozero import Button, MCP3008 # Button (on/off signal detector) - Sparkfun Weather Meter, MCP3008 - ADC converter
import adafruit_dht # Barometer, altimeter
import adafruit_lps2x # Temperature and humidity
import psutil # Process manager
from apscheduler.schedulers.background import BackgroundScheduler # Threading
import mysql.connector # SQL database
from config import config # SQL database config

# Fixes DHT library on second run. For some reason the event listener doesn't close properly.
for proc in psutil.process_iter():
    if proc.name() == 'libgpiod_pulsein' or proc.name() == 'libgpiod_pulsei':
        proc.kill()

results = {} # Current results
results_old = {} # Past results, ensures that the database is filled even if DHT errors out. 
# DHT timeouts are a frequent occurence due to how the tech is implemented on the manufacturer's side.

class Wind():
    # Count (speed)
    dev_wind_sensor = Button(5) # GPIO port 5
    wind_interval = 5 # Refresh every 5 seconds
    windcount = 0
    
    # Direction
    adc = MCP3008(channel=0)
    count = 0
    values = []
    volts = {0.4: 0.0,
             1.4: 22.5,
             1.2: 45.0,
             2.8: 67.5,
             2.7: 90.0,
             2.9: 112.5,
             2.2: 135.0,
             2.5: 157.5,
             1.8: 180.0,
             2.0: 202.5,
             0.7: 225.0,
             0.8: 247.5,
             0.1: 270.0,
             0.3: 292.5,
             0.2: 315.0,
             0.6: 337.5} # Static values for converting voltage to degrees. See guide in README

    def spin(self):
        self.windcount += 1
        #print("spin "+str(count))

    def cmsToKmh(self, speed):
        # The wind speed is by default measured in centimeters per second. 
        # To make it make sense to the end user, we convert it to kilometers per hour.
        # You could probably convert to miles as well if you're American.
        
        cm_w_km = 100000.0 # Centimeters in a kilometer
        sek_w_godz = 3600 # Seconds in an hour
        
        km_na_sek = speed / cm_w_km
        km_na_godz = km_na_sek * sek_w_godz
        
        return km_na_godz

    def cmsToMs(self, speed): # Centimeters per second to meters per second
        return speed / 100

    def calibrate(self, speed):
        return speed*1.18 # Correction factor for the wind sensor, See guide in README

    def reset_wind(self):
        self.windcount = 0

    def calculate_speed(self):
        """"
        
        Speed calculation: V = S / t
        We're calculating the speed of the wind by dividing the distance traveled by the time it took to travel it.
        The distance is calculated by multiplying the circumference of the wind sensor by the number of rotations within the timeframe (5 seconds).
    
        The radius of the main anemometer is different for each sensor, so you'll have to measure it yourself.
        For SparkFun, it is 9 cm.
           
        """
        self.store_speeds_kmh = []
        self.store_speeds_ms = []

        radius_cm = 9.0
        circumference_cm = (2 * math.pi) * radius_cm
        rotations = self.windcount / 2.0
        dist_cm = circumference_cm * rotations
        speed = dist_cm / self.wind_interval 
        
        return (round(self.cmsToKmh(self.calibrate(speed)), 2), round(self.cmsToMs(self.calibrate(speed)), 2))
    
    def wind_count(self):
        self.dev_wind_sensor.when_pressed = self.spin
    
        final_speed_kmh = self.calculate_speed()[0] # Get average speed in 5 second interval (km/h)
        final_speed_ms = self.calculate_speed()[1] # Get average speed in 5 second interval (m/s)
        self.store_speeds_kmh.append(final_speed_kmh)
        self.store_speeds_ms.append(final_speed_ms)
    
        # Wind gusts are the highest speeds in a 5 second interval.
        # Wind speed is the mean speed in a 5 second interval.
        results['wind_gust_kmh'] = round(max(self.store_speeds_kmh), 2)
        results['wind_gust_ms'] = round(max(self.store_speeds_ms), 2)
        
        results['wind_speed_kmh'] = round(statistics.mean(self.store_speeds_kmh), 2)
        results['wind_speed_ms'] = round(statistics.mean(self.store_speeds_ms), 2)
    
    def get_average(self, angles):
        """
        Get the average of a number of angles.
        The weather station returns them in radians, so we have to convert them to degrees.
        To calculate the average, we calculate the arcus tangens of the sum of the sines divided by the sum of the cosines.
        Read more at https://en.wikipedia.org/wiki/Directional_statistics.
        Then we convert the result to a range of 0-360 degrees.
        """
        sin_sum = 0.0
        cos_sum = 0.0

        for angle in angles:
            r = math.radians(angle)
            sin_sum += math.sin(r)
            cos_sum += math.cos(r)

        flen = float(len(angles))
        try:
            s = sin_sum / flen
            c = cos_sum / flen
        except ZeroDivisionError:
            s = 0
            c = 0
        
        arc = math.degrees(math.atan(s / c))
        average = 0.0

        if s > 0 and c > 0:
            average = arc
        elif c < 0:
            average = arc + 180
        elif s < 0 and c > 0:
            average = arc + 360

        return 0.0 if average == 360 else average
    

    def wind_direction(self):
        data = []
        wind = round(self.adc.value*3.3, 1) # Get voltage from ADC converter
        # The datasheet assumes 10k ohms for a 5V rail, but the Raspberry Pi's GPIO rail is 3.3V.
        # We have to adjust the values accordingly.
        if not wind in self.volts:
            pass
            #print("Unknown value" + str(wind))
        else:
            data.append(self.volts[wind])

        results['wind_direction'] = self.get_average(data)
    
    def post(self): # Start the sensors
        self.wind_count()
        self.reset_wind()
        self.wind_direction()

class Rain():
    dev_rain_sensor = Button(6) # GPIO 6
    rain_count = 0
    bucket_size = 0.2794 # Size of the bucket. Differs from model to model.
        
    def raincount(self):
        self.dev_rain_sensor.when_pressed = self.tip
    
    def tip(self):
        self.rain_count += 1
        results['rain_count'] = round(self.rain_count * self.bucket_size, 2)

    def reset_rainfall(self): # Reset rainfall every hour
        self.rain_count = 0
        
    def post(self): # Start the sensors
        self.raincount()    

class ActiveSensors():
    dev_temp_humi_sensor = adafruit_dht.DHT21(board.D4) # GPIO port 4
    dev_i2c = board.I2C() # I2C has to be enabled in raspi-config for this to work!
    dev_lps = adafruit_lps2x.LPS25(dev_i2c) # Port 2 - clock, port 3 - data
    
    def temp_humi_sensor(self):
        try:
            # Print the values to the serial port
            temperature = self.dev_temp_humi_sensor.temperature
            humidity = self.dev_temp_humi_sensor.humidity
            results['temperature_1'] = temperature
            results['humidity'] = humidity
        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print(error.args[0])
            time.sleep(2.0)
        except Exception as error:
            self.dev_temp_humi_sensor.exit()
            # Raise error
            time.sleep(2.0)
    
    def pressure_sensor(self):
        results['pressure'] = self.dev_lps.pressure
        results['temperature_2'] = self.dev_lps.temperature

    def post(self):
        self.temp_humi_sensor()
        self.pressure_sensor()
        
class SQLDatabase:
    
    def __init__(self):
        try:
            params = config() # Load connection parameters from config.py
            self.conn = mysql.connector.connect(**params)       
        except (Exception, mysql.connector.DatabaseError) as err: # Catch errors
            print(f"Błąd połączenia z bazą: {err}")
        
    def execute(self, sql):
        self.cur = self.conn.cursor()
        self.cur.execute(sql)
        self.conn.commit()
        
    def close_conn(self):
        self.cur.close()
        self.conn.close() # Close connection to database
       

# Driver code

print("=" * 20)
print("Pistacja is active!")
print("Made by Jakub Rutkowski & Ania Fiń 2022-2023")
print("=" * 20)

# Initialize classes
wind = Wind()
rain = Rain()
act = ActiveSensors()

# Threading
sched = BackgroundScheduler(job_defaults={'max_instances': 6})
sched.add_job(wind.post, 'interval', seconds=5)
sched.add_job(rain.post, 'interval', seconds=5)
sched.add_job(act.post, 'interval', seconds=5)
sched.add_job(rain.reset_rainfall, 'interval', hours=1)
sched.start()

db = SQLDatabase() # Connect to database
atexit.register(db.close_conn) # Close connection to database on exit
db.execute("INSERT INTO start_times VALUES(CURRENT_TIMESTAMP()") # Save start time to database, for uptime

while(True):
    time.sleep(5)
    results = results_old | results # Overwrite all old values with new ones
    db.execute(f"INSERT INTO results(wind_speed_kmh, wind_speed_ms, rain_count, temperature_1, temperature_2, pressure, humidity, wind_gust_kmh, wind_gust_ms) VALUES({results['wind_speed_kmh']}, {results['wind_speed_ms']}, {results['rain_count']}, {results['temperature_1']}, {results['temperature_2']}, {results['pressure']}, {results['humidity']}, {results['wind_gust_kmh']}, {results['wind_gust_ms']})")
    #print(f"INSERT INTO results(wind_speed_kmh, wind_speed_ms, rain_count, temperature_1, temperature_2, pressure, humidity, wind_gust_kmh, wind_gust_ms) VALUES({results['wind_speed_kmh']}, {results['wind_speed_ms']}, {results['rain_count']}, {results['temperature_1']}, {results['temperature_2']}, {results['pressure']}, {results['humidity']}, {results['wind_gust_kmh']}, {results['wind_gust_ms']})")
    results_old = results
