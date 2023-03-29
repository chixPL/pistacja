import '../../lib/chartjs/chart.umd.min.js';
import { DateTime } from "../../lib/luxon/luxon.min.js";

function load(){

    let start = new Date();

    function getRandomData(len){
        return Array.from({length: len}, () => Math.ceil(Math.random() * 30)); // todo: zamienić na DB
    }

    function config(title, chartData, color){
        return {
          labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
          datasets: [{
            label: title,
            data: chartData,
            backgroundColor: color,
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

    const ctx1 = document.getElementById('chart1');
    const ctx2 = document.getElementById('chart2');
    const ctx3 = document.getElementById('chart3');
    const ctx4 = document.getElementById('chart4');
    
    // Paleta kolorów uzupełniających: '#B20D3B', '#FF457A', '#DB2559', '#0F8F1E', '#25DB3C'

    const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: config('Temperatura (°C)', getRandomData(7), '#B20D3B'),
    });

    const chart2 = new Chart(ctx2, {
        type: 'bar',
        data: config('Prędkość wiatru (km/h)', getRandomData(7), '#FF457A'),
    });

    const chart3 = new Chart(ctx3, {
        type: 'bar',
        data: config('Ciśnienie (hPa)', getRandomData(7), '#25DB3C'),
    });

    const chart4 = new Chart(ctx4, {
        type: 'bar',
        data: config('Opady (mm)', getRandomData(7), '#0F8F1E')
    });

    
    const bcb = document.getElementById('bar_chart'); // bar chart button
    const lcb = document.getElementById('line_chart'); // line chart button

    function viewBar(){

        for(let i=1; i<5; i++){
            let current_chart = eval('chart'+i);
            current_chart.config.type = "bar";
            current_chart.update();
        }
    
        bcb.classList.add('btn-primary');
        bcb.classList.remove('btn-secondary');
        lcb.classList.add('btn-secondary');
        
    };
    
    function viewLine(){

        for(let i=1; i<5; i++){
            let current_chart = eval('chart'+i);
            current_chart.config.type = "line";
            current_chart.update();
        }
    
    
        lcb.classList.add('btn-primary');
        lcb.classList.remove('btn-secondary');
        bcb.classList.add('btn-secondary');
        
    };

    bcb.addEventListener("click", viewBar, false);
    lcb.addEventListener("click", viewLine, false);


    let data_dict = {}; // dane dla wykresów, żeby się nie zmieniały przy kolejnym uruchomieniu
    
    function viewDays(num){
      console.log("Viewing days: ", num);
      if (data_dict[num] === undefined){
      data_dict[num] = getRandomData(num);
      }
      //console.log(data_dict)

      for(let i=1; i<5; i++){
        let current_chart = eval('chart'+i);
 
        // Skasuj istniejące dane
        current_chart.data.labels = [];
        current_chart.data.datasets[0].data = [];

        // Dodaj nowe dane
        current_chart.data.datasets[0].data = data_dict[num];
        if(num == 7){
          current_chart.data.labels = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
        }
        else{
        current_chart.data.labels = [...Array(num).keys()].map(x => x+1);         // tablica od 1 do num'
      }

        current_chart.options.plugins.tooltip.callbacks.title = function(context) {
          return DateTime.now().minus({days: num - parseInt(context[0].label)}).setLocale('pl').toLocaleString(DateTime.DATE_FULL); // zwróć datę N dni od teraz w formacie np. 15 marca 2023
        };
        current_chart.update();
      }
    }
    
    let btn1 = document.getElementById('btnradio1');
    let btn2 = document.getElementById('btnradio2');
    let btn3 = document.getElementById('btnradio3');
    
    btn1.addEventListener("click", function(event) {viewDays(7);});
    btn2.addEventListener("click", function(event) {viewDays(14);});
    btn3.addEventListener("click", function(event) {viewDays(30);});
    
};

window.onload = (event) => {
    load();
  };