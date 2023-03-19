import 'https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.min.js';

function load(){

    let start = new Date();

    function getRandomData(){
        return Array.from({length: 7}, () => Math.ceil(Math.random() * 30)); // todo: zamienić na DB
    }
    function currentUptime(){
        document.getElementById('uptime').innerHTML = new Date(Date.now() - start);
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

    const uptime = window.setInterval(currentUptime, 1000)

    const ctx1 = document.getElementById('chart1');
    const ctx2 = document.getElementById('chart2');
    const ctx3 = document.getElementById('chart3');
    const ctx4 = document.getElementById('chart4');
    
    // Paleta kolorów uzupełniających: '#FF457A', '#DB2559', '#0F8F1E', '#25DB3C'

    const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: config('Temperatura (°C)', getRandomData(), '#FF457A'),
    });

    const chart2 = new Chart(ctx2, {
        type: 'bar',
        data: config('Prędkość wiatru (km/h)', getRandomData(), '#DB2559'),
    });

    const chart3 = new Chart(ctx3, {
        type: 'bar',
        data: config('Ciśnienie (hPa)', getRandomData(), '#0F8F1E'),
    });

    const chart4 = new Chart(ctx4, {
        type: 'bar',
        data: config('Opady (mm)', getRandomData(), '#25DB3C')
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
    
};

window.onload = (event) => {
    load();
  };