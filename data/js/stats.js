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
    

    new Chart(ctx1, {
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

    new Chart(ctx2, {
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
    new Chart(ctx3, {
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

    new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
            datasets: [{
            label: 'Temperatura (°C)',
            data: getRandomData(),
            backgroundColor: '#25DB3C',
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

        
}

window.onload = (event) => {
    load();
  };