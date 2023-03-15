import 'https://cdn.jsdelivr.net/npm/chart.js@4.2.0/dist/chart.umd.min.js';

function load(){

    let start = new Date();

    function getRandomData(){
        return Array.from({length: 7}, () => Math.ceil(Math.random() * 30)); // todo: zamienić na DB
    }
    function currentUptime(){
        document.getElementById('uptime').innerHTML = new Date(Date.now() - start);
    }

    const uptime = window.setInterval(currentUptime, 1000)

    const ctx1 = document.getElementById('chart1');
    const ctx2 = document.getElementById('chart2');
    const ctx3 = document.getElementById('chart3');
    const ctx4 = document.getElementById('chart4');
    

    const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
        datasets: [{
        label: 'Temperatura (°C)',
        data: getRandomData(),
        backgroundColor: '#FF457A',
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        },
    }
    });

    const chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
            datasets: [{
            label: 'Prędkość wiatru (km/h)',
            data: getRandomData(),
            backgroundColor: '#DB2559',
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            },
        }
        });
    const chart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
            datasets: [{
            label: 'Temperatura (°C)',
            data: getRandomData(),
            backgroundColor: '#0F8F1E',
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            },
    }
    });

    const chart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
            datasets: [{
            label: 'Temperatura (°C)',
            data: getRandomData(),
            backgroundColor: '#25DB3C',
            borderWidth: 1
            },
        
        ]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            },
        }
        });


    function viewBar(){

        for(let i=1; i<5; i++){
            let current_chart = eval('chart'+i);
            current_chart.config.type = "bar";
            current_chart.update();
        }
    
        document.getElementById("bar_chart").classList.add('btn-primary');
        document.getElementById("bar_chart").classList.remove('btn-secondary');
        document.getElementById("line_chart").classList.add('btn-secondary');
        
    };
    
    function viewLine(){

        for(let i=1; i<5; i++){
            let current_chart = eval('chart'+i);
            current_chart.config.type = "line";
            current_chart.update();
        }
    
    
        document.getElementById("line_chart").classList.add('btn-primary');
        document.getElementById("line_chart").classList.remove('btn-secondary');
        document.getElementById("bar_chart").classList.add('btn-secondary');
        
    };

    document.getElementById ("bar_chart").addEventListener ("click", viewBar, false);
    document.getElementById ("line_chart").addEventListener ("click", viewLine, false);
    
};

window.onload = (event) => {
    load();
  };