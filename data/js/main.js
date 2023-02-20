import { CountUp } from '../lib/countup/countUp.min.js';
import '../lib/chartjs/chart.umd.min.js';

const text = document.getElementById("changeText");
const progressbar = document.getElementById("resetprogress")

let previous_data = {'temperature': 0, 'wind_speed_kmh': 0, 'pressure': 0, 'rain_count': 0, 'humidity' : 0}; // dla counterów

class EventLoop{

  constructor(){
    this.counter = 0;
    this.number = 2;
  }

  change =()=>{
    text.innerHTML = "Odświeżenie za <span class='primarycolor'><b><u>" + (5-this.counter) + "</b></u></span> sekund";
    progressbar.style = "width: " + this.counter*20 + "%";
    progressbar.ariaValueNow = this.counter*20;
  }

  requestData =()=>{

    if(this.number > 5){
      this.number = 2;
    }
    const $this = this;

    $.ajax({
      url: ".db/sqlconnect.php",
      type: 'POST',
      data: {"num": this.number},
      dataType:"json",
      success: function(data) {
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
        $this.number++;

    }})};

  main_loop =()=>{
    if(this.counter > 5){
      this.requestData();
      this.counter = 0;
    }
    this.change();
    this.counter++;
  }

}

  function start(){

  // Testowa funkcja, wkrótce implementacja z DB + PHP
  let rnd_temp = Array.from({length: 7}, () => Math.ceil(Math.random() * 30)); // randomowa temperatura, inna przy każdym odświeżeniu :p
  let rnd_wind = Array.from({length: 7}, () => (Math.random() * (6 - 0) + 0).toFixed(2)); // randomowa prędkość wiatru, inna przy każdym odświeżeniu :p

  const ctx_temp = document.getElementById('temp-chart');
  const ctx_wind = document.getElementById('wind-chart');

  new Chart(ctx_temp, {
    type: 'bar',
    data: {
      labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      datasets: [{
        label: 'Temperatura (°C)',
        data: rnd_temp,
        backgroundColor: '#FF6384',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });


  new Chart(ctx_wind, {
    type: 'bar',
    data: {
      labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      datasets: [{
        label: 'Prędkość wiatru (km/h)',
        data: rnd_wind,
        backgroundColor: '#FF6384',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });


  let el = new EventLoop();
  el.requestData();
  const loop = setInterval(el.main_loop, 1000);

}

window.onload = (event) => {
  start();
};
