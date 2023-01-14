import { CountUp } from './data/js/countUp.min.js';

let counter = 0;
let text = document.getElementById("changeText");
let progressbar = document.getElementById("resetprogress")
let progress = setInterval(change, 1000);
let updateSql = setInterval(requestData, 5000)

function change() {
  text.innerHTML = "Restart za " + (5-counter) + " sekund";
  progressbar.style = "width: " + counter*20 + "%";
  progressbar.ariaValueNow = counter*20;
  counter++;

  /* testowa funkcja */
  if(counter > 5){
    counter = 0;
  }
}


let number = 2;
let previous_data = {'temperature': 0, 'wind_speed_kmh': 0, 'pressure': 0, 'rain_count': 0, 'humidity' : 0}; // dla counterów

function requestData(){
  if(number > 5){
    number = 2;
  }
  $.ajax({
    url: ".db/sqlconnect.php",
    type: 'POST',
    data: {"num": number},
    dataType:"json",
    success: function(data) {
      var countTemp = new CountUp('temperature-value', data['temperature'], {startVal: previous_data['temperature'], decimalPlaces: 2, duration: 2});
      var countWind = new CountUp('wind-value', data['wind_speed_kmh'], {startVal: previous_data['wind_speed_kmh'], decimalPlaces: 2, duration: 2});
      var countPressure = new CountUp('pressure-value', data['pressure'], {startVal: previous_data['pressure'], useGrouping: false, duration: 2});
      var countRain = new CountUp('rain-value', data['rain_count'], {startVal: previous_data['rain_count'], decimalPlaces: 2, duration: 2});
      var countHumidity = new CountUp('humidity-value', data['humidity'], {startVal: previous_data['humidity'], duration: 2});
      
      countTemp.start();
      countWind.start();
      countPressure.start();
      countRain.start();
      countHumidity.start();
      
      previous_data = data;

   }})
   
   number += 1;
}

requestData();

/*
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
*/