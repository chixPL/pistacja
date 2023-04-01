<?php
$host = "localhost";
$database = "pogoda";
$user = "my_username";
$password = "my_password";
$port = 3306;

$conn = mysqli_connect($host, $user, $password, $database, $port);
if (!$conn) {
    die("Połączenie nieudane: " . mysqli_connect_error());
}
?>