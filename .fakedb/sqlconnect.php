<?php

$host = "localhost";
$database = "pogoda";
$user = "my_username";
$password = "my_password";
$port = 3306;

$conn = mysqli_connect($host, $user, $password, $database, $port);
$sql = sprintf("SELECT wind_speed_kmh, rain_count, ROUND(((temperature_1 + temperature_2) /2),2) AS temperature, ROUND(pressure, 0) AS pressure, humidity, wind_gust_kmh FROM results WHERE id_measure = %d", $_POST['num']);
$query = mysqli_query($conn, $sql);
$rs= mysqli_fetch_array($query);

echo json_encode($rs);

?>