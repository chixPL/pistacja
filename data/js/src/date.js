import { DateTime } from "../../lib/luxon/luxon.min.js";
function changeStyle(color){
  const nextbtn = document.querySelector('.fc-mynext-button');
  nextbtn.setAttribute('style', 'background-color: '+color+' !important');
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
    });
    calendar.render();
  });