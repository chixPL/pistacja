import { CountUp } from './data/js/countUp.min.js';

const text = document.getElementById("changeText");
const progressbar = document.getElementById("resetprogress")

let previous_data = {'temperature': 0, 'wind_speed_kmh': 0, 'pressure': 0, 'rain_count': 0, 'humidity' : 0}; // dla counterów

class EventLoop{

  constructor(){
    let counter = 0; // odświeżanie co 5 sekund, zaczynamy od 5 żeby uruchomiło się na starcie
    let number = 2; // testowo: pętla od 2 do 5 pomiaru

    this.counter = counter;
    this.number = number;
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
        this.number++;

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

let el = new EventLoop();
el.requestData();
const loop = setInterval(el.main_loop, 1000);