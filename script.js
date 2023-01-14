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

function requestData(){
  $.ajax({
    url: ".db/sqlconnect.php",
    type: 'POST',
    dataType:"json",
    success: function(data) {
      document.getElementById("temperature-value").innerText = data['temperature'];
      document.getElementById("wind-value").innerText = data['wind_speed_kmh'];
      document.getElementById("pressure-value").innerText = data['pressure'];
      document.getElementById("rain-value").innerText = data['rain_count'];
      document.getElementById("humidity-value").innerText = data['humidity'];
   }})
}

requestData();

/*
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
*/