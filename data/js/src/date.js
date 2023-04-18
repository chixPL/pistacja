import { DateTime } from "../../lib/luxon/luxon.min.js";

function changeStyle(color){
  const nextbtn = document.querySelector('.fc-mynext-button');
  nextbtn.setAttribute('style', 'background-color: '+color+' !important');
}

async function getSqlResults(url = "", date = "") {
  var formData = new FormData();
  formData.append('date', date);  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "date=" + date
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      themeSystem: 'bootstrap5',
      height: 'auto',
      buttonIcons : {
        myprev: 'chevron-left',
        mynext: 'chevron-right',
      },
      customButtons: {
        mynext: {
          click: function() {
            let date = DateTime.fromISO(calendar.getDate().toISOString());
            if(date.plus({months: 1}).toFormat('yyyy-MM') <= DateTime.now().toFormat('yyyy-MM')) {
              calendar.next();
            } else {
              changeStyle('#8d8f91');
            }
          }
        },
        myprev: {
          click: function() {
              changeStyle('#B20D3B');
              calendar.prev();
          }
        },
        mytoday: {
          text: 'Dziś',
          click: function() {
              changeStyle('#8d8f91');
              calendar.today();
          }
        },
      },
      headerToolbar: {
        start: 'title',
        right: 'mytoday myprev,mynext'
      },
      initialView: 'dayGridMonth',
      firstDay: 1,
      locale: 'pl',
      dateClick: function(info) {
        const title = document.querySelector('.modal-title');
        const description = document.querySelector('.modal-body');
        title.innerHTML = 'Data: ' + info.dateStr;
        getSqlResults('.db/date_res.php', info.dateStr).then(data => {
          description.innerHTML = '';
          // console.log(info.dateStr + "|" + JSON.stringify(data));
          if(data == null) {
            description.innerHTML += '<p>Nie znaleziono danych dla tego dnia.</p>';
          } else {
          let res = JSON.parse(JSON.stringify(data));
          // console.log(res); 
          description.innerHTML += '<p class="result"><b>Temperatura:</b> ' + res['temperature'] + '°C</p>';
          description.innerHTML += '<p class="result"><b>Prędkość wiatru:</b> ' + res['wind_speed_kmh'] + 'km/h</p>';
          description.innerHTML += '<p class="result"><b>Ciśnienie:</b> ' + res['pressure'] + 'hPa</p>';
          description.innerHTML += '<p class="result"><b>Opady:</b> ' + res['rain_count'] + 'mm</p>';
          description.innerHTML += '<p class="result"><b>Wilgotność:</b> ' + res['humidity'] + '%</p>';;
        }
      });
        const myModal = new bootstrap.Modal(document.getElementById('dateModal'));
        myModal.show();
      },
    });
    calendar.render();
  });