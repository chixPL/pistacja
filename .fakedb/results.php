<?php
include('db_connect.php');
$sql = sprintf("SELECT wind_speed_kmh, rain_count, ROUND(((temperature_1 + temperature_2) /2),2) AS temperature, ROUND(pressure, 0) AS pressure, humidity, wind_gust_kmh FROM results WHERE id_measure = %d", $_POST['num']);
$query = mysqli_query($conn, $sql);
$rs= mysqli_fetch_array($query);

echo json_encode($rs);
?>