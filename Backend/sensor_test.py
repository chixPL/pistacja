# Pistacja
# Testy czujników

import unittest
import math
import time
import board
from gpiozero import Button, MCP3008
import adafruit_dht
import adafruit_lps2x

class TestWind(unittest.TestCase):

    def test_wind_count(self):
        accessed = False

        def spin():
            global accessed
            accessed = True
        
        wind_speed_sensor = Button(5)
        wind_speed_sensor.when_pressed = spin
        time.sleep(10)
        self.assertTrue(accessed)
    
    def test_wind_direction(self):
        adc = MCP3008(channel=0)

        self.assertIsNotNone(adc.value)

class TestRain(unittest.TestCase):
    
    def test_rain_count(self):
        rain_sensor = Button(6)
        self.assertTrue(rain_sensor.is_pressed)

class TestActiveSensors(unittest.TestCase):
    
    def test_temp_humi_sensor(self):
        dev_temp_humi_sensor = adafruit_dht.DHT21(board.D4)
        self.assertIsNotNone(dev_temp_humi_sensor.temperature)
        self.assertIsNotNone(dev_temp_humi_sensor.humidity)
    
    def test_lps_sensor(self):
        dev_i2c = board.I2C()
        dev_lps = adafruit_lps2x.LPS25(dev_i2c)
        self.assertIsNotNone(dev_lps.pressure)
        self.assertIsNotNone(dev_lps.temperature)
        
if __name__ == '__main__':
    unittest.main()
            