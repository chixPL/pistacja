<?php
include('.db/sqlconnect.php');
$sql = "SELECT wind_speed_kmh, rain_count, ROUND(((temperature_1 + temperature_2) /2),2) AS temperature, ROUND(pressure, 0) AS pressure, humidity, wind_gust_kmh FROM results WHERE id_measure = 2";
$query = mysqli_query($conn, $sql);
$rs= mysqli_fetch_array($query);

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Pistacja</title>
</head>
<body>

    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light" style="background-color:#B20D3B;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="data/images/pistacja-logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                <b><span class="primarycolor">Pi</b></span>stacja
              </a>          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Strona główna</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://github.com/chixPL/pistacja-frontend">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container-fluid mt-1">
        <!-- Wyniki z DB -->
        <div class="container ms-1">
        <h1>Temperatura:
        <h2><b><?php echo $rs['temperature']?><span class="unit superscript"> °C</span></b></h2>
        </div>
        <br>

        <div class="container ms-1">
        <h1>Wiatr:
        <h2><b><?php echo $rs['wind_speed_kmh'];?><span class="unit"> km/h</span></b></h2>
        </div>
        <br>

        <div class="container ms-1">
        <h1>Ciśnienie:
        <h2><b><?php echo $rs['pressure'];?><span class="unit"> hPa</span></b></h2>
        </div>
        <br>

        <div class="container ms-1">
        <h1>Deszcz:
        <h2><b><?php echo $rs['rain_count'];?><span class="unit"> mm</span></b></h2>
        </div>
        <br>

        <div class="container ms-1">
        <h1>Wilgotność:
        <h2><b><?php echo $rs['humidity'];?><span class="unit"> %</span></b></h2>
        </div>
        <br>

      </div>

      <p id="changeText"></p>
      <div class="progress" style="width: 25%;">
        <div id="resetprogress" class="progress-bar bg-danger" role="progressbar" aria-label="Basic example" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      <script src="script.js"></script>
</body>
</html>