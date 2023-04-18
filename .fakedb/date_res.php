<?php
include('db_connect.php');
$sql = sprintf("SELECT wind_speed_kmh, rain_count, ROUND(((temperature_1 + temperature_2) /2),2) AS temperature, ROUND(pressure, 0) AS pressure, humidity FROM statistics WHERE DATE(measure_time) = '%s'", $_POST['date']);
// $sql = "SELECT wind_speed_kmh, rain_count, ROUND(((temperature_1 + temperature_2) /2),2) AS temperature, ROUND(pressure, 0) AS pressure, humidity FROM statistics WHERE DATE(measure_time) = '2023-04-18'";
$query = mysqli_query($conn, $sql);
$rs = mysqli_fetch_array($query);

echo json_encode($rs);
?>