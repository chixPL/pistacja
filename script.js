import { CountUp } from './data/js/countUp.min.js';
import 'https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.min.js';

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

const ctx = document.getElementById('myChart');

// Testowa funkcja, wkrótce implementacja z DB + PHP
let rnd_data = Array.from({length: 6}, () => Math.ceil(Math.random() * 6)); // randomowa temperatura, inna przy każdym odświeżeniu :p
console.log(rnd_data);

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    datasets: [{
      label: 'Temperatura (°C)',
      data: rnd_data,
      backgroundColor: '#FF6384',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

let el = new EventLoop();
el.requestData();
const loop = setInterval(el.main_loop, 1000);