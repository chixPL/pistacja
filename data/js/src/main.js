import { CountUp } from '../../lib/countup/countUp.min.js';
import '../../lib/chartjs/chart.umd.min.js';

const progressbar = document.getElementById("resetprogress");
const numCountdown = document.getElementById("countdown");
let previous_data = {'temperature': 0, 'wind_speed_kmh': 0, 'pressure': 0, 'rain_count': 0, 'humidity' : 0}; // dla counterów

function get_range(x, min, max) {
  return x >= min && x <= max;
}

function config(title, chartData){
  return {
    labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    datasets: [{
      label: title,
      data: chartData,
      backgroundColor: '#B20D3B',
      borderWidth: 1
    }],
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
  }
}
}

async function getSqlResults(url = "", num = 0) {
  var formData = new FormData();
  formData.append('num', num);  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "num=" + num
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

class EventLoop{

  constructor(){
    this.counter = 0;
    this.number = 2;
  }

  change =()=>{
    numCountdown.innerHTML = 5-this.counter;
    progressbar.style = "width: " + this.counter*20 + "%";
    progressbar.ariaValueNow = this.counter*20;
  }

  update = (data)=>{
    let countTemp = new CountUp('temperature-value', data['temperature'], {startVal: previous_data['temperature'], decimalPlaces: 2, duration: 2});
    let countWind = new CountUp('wind-value', data['wind_speed_kmh'], {startVal: previous_data['wind_speed_kmh'], decimalPlaces: 2, duration: 2});
    let countPressure = new CountUp('pressure-value', data['pressure'], {startVal: previous_data['pressure'], useGrouping: false, duration: 2});
    let countRain = new CountUp('rain-value', data['rain_count'], {startVal: previous_data['rain_count'], decimalPlaces: 2, duration: 2});
    let countHumidity = new CountUp('humidity-value', data['humidity'], {startVal: previous_data['humidity'], duration: 2});
    
    countTemp.start();
    countWind.start();
    countPressure.start();
    countRain.start();
    countHumidity.start();
    
    previous_data = data;
    this.number++;

    // Testowa funkcja, wkrótce implementacja z DB + PHP
    
    /*
    340-0 + 1-20: N
    21-60: NE
    61-110: E
    111-160: SE
    161-200: S
    201-250: SW
    251-290: W
    291-340: NW
    */

    let wind_dir = Math.random() * 337.5;
    let dir_text = ''; // tekst kierunku wiatru

    switch(true){
      case get_range(wind_dir, 1, 20):
        dir_text = 'N';
        break;
      case get_range(wind_dir, 21, 60):
        dir_text = 'NE';
        break;
      case get_range(wind_dir, 61, 110):
        dir_text = 'E';
        break;
      case get_range(wind_dir, 111, 160):
        dir_text = 'SE';
        break;
      case get_range(wind_dir, 161, 200):
        dir_text = 'S';
        break;
      case get_range(wind_dir, 201, 250):
        dir_text = 'SW';
        break;
      case get_range(wind_dir, 251, 290):
        dir_text = 'W';
        break;
      case get_range(wind_dir, 291, 340):
        dir_text = 'NW';
        break;
      case get_range(wind_dir, 341, 360):
        dir_text = 'N';
        break;
    }

    if(dir_text.length > 1){ // jeśli długość tekstu jest większa niż 1 znak, to przesuń w lewo żeby nadal był na środku
      document.getElementById('direction').style['margin-left'] = '-5px';
    }
    else {
      document.getElementById('direction').style['margin-left'] = '0px';
    }

    compass.style.transform = 'rotate(' + wind_dir.toFixed(0) + 'deg)'
    document.getElementById('direction').innerHTML = '<b>' + dir_text + '</b>';
}

  requestData =()=>{

    if(this.number > 5){
      this.number = 2;
    }
    getSqlResults(".db/sqlconnect.php", this.number).then((data) => {
      this.update(data);
    });
  
  };

  main_loop =()=>{
    if(this.counter > 5){
      this.requestData();
      this.counter = 0;
    }
    this.change();
    this.counter++;
  }

}


// Testowa funkcja, wkrótce implementacja z DB + PHP
let rnd_temp = Array.from({length: 7}, () => Math.ceil(Math.random() * 30)); // randomowa temperatura, inna przy każdym odświeżeniu :p
let rnd_wind = Array.from({length: 7}, () => (Math.random() * (6 - 0) + 0).toFixed(2)); // randomowa prędkość wiatru, inna przy każdym odświeżeniu :p

const ctx_temp = document.getElementById('temp-chart');
const ctx_wind = document.getElementById('wind-chart');

// Wykresy
new Chart(ctx_temp, {
  type: 'bar',
  data: config('Temperatura (°C)', rnd_temp),
});

new Chart(ctx_wind, {
  type: 'bar',
  data: config('Prędkość wiatru (km/h)', rnd_wind),
});

window.onload = (event) => {
  let el = new EventLoop();
  el.requestData();
  const loop = setInterval(el.main_loop, 1000);
};