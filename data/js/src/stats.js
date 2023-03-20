import '../../lib/chartjs/chart.umd.min.js';

function load(){

    let start = new Date();

    function getRandomData(len){
        return Array.from({length: len}, () => Math.ceil(Math.random() * 30)); // todo: zamienić na DB
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

    // todo: naprawić wyświetlanie chartów na dni
    // function viewDays(num){
    //   console.log("Viewing days: ", num);

    //   for(let i=1; i<5; i++){
    //     let current_chart = eval('chart'+i);
 
    //     // Skasuj istniejące dane
    //     current_chart.data.labels.pop()
    //     current_chart.data.datasets[0].data.pop()


    //     // Dodaj nowe dane
    //     current_chart.data.labels.push([...Array(num).keys()])
    //     current_chart.data.datasets[0].data.push(getRandomData(num));
    //     console.log(getRandomData(num))

    //     current_chart.update();
    //   }
    // }
    
    // if(document.getElementById('btnradio1').is(":checked")){
    //   console.log("7 dni");
    //   viewDays(7);
    // }
    // if(document.getElementById('btnradio2').is(":checked")){
    //   console.log("14 dni");
    //   viewDays(14);
    // }
    // if(document.getElementById('btnradio3').is(":checked")){
    //   console.log("30 dni");
    //   viewDays(30);
    // }
    
    document.getElementById('btnradio1').addEventListener("click", function(event) {viewDays(7);});
    document.getElementById('btnradio2').addEventListener("click", function(event) {viewDays(14);});
    document.getElementById('btnradio3').addEventListener("click", function(event) {viewDays(30);});
    

    
};

window.onload = (event) => {
    load();
  };