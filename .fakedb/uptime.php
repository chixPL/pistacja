<?php
include('db_connect.php');

$sql = "SELECT start_time FROM start_times ORDER BY start_time DESC LIMIT 1";
$query = mysqli_query($conn, $sql);
$startTime = mysqli_fetch_row($query);

// set the timezone to your preferred timezone
date_default_timezone_set('Europe/Warsaw');

// define the MySQL timestamp
$mysql_timestamp = $startTime[0];

// convert the MySQL timestamp to a DateTime object
$date = new DateTime($mysql_timestamp);

// get the current time
$now = new DateTime();

// get the difference between the two dates
$diff = $now->diff($date);

// format the output string
$years   = $diff->y;
$months  = $diff->m;
$days    = $diff->d;
$hours   = $diff->h;
$minutes = $diff->i;
$seconds = $diff->s;

if ($years > 0) {
    $output[] = sprintf('%d %s', $years, ($years == 1) ? 'rok' : (($years > 1 && $years < 5) ? 'lata' : 'lat'));
}
if ($months > 0) {
    $output[] = sprintf('%d %s', $months, ($months == 1) ? 'miesiąc' : (($months > 1 && $months < 5) ? 'miesiące' : 'miesięcy'));
}
if ($days > 0) {
    $output[] = sprintf('%d %s', $days, ($days == 1) ? 'dzień' : (($days > 1 && $days < 5) ? 'dni' : 'dni'));
}
if ($hours > 0) {
    $output[] = sprintf('%d %s', $hours, ($hours == 1) ? 'godzina' : (($hours > 1 && $hours < 5) ? 'godziny' : 'godzin'));
}
if ($minutes > 0) {
    $output[] = sprintf('%d %s', $minutes, ($minutes == 1) ? 'minuta' : (($minutes > 1 && $minutes < 5) ? 'minuty' : 'minut'));
}
if ($seconds > 0) {
    $output[] = sprintf('%d %s', $seconds, ($seconds == 1) ? 'sekunda' : (($seconds > 1 && $seconds < 5) ? 'sekundy' : 'sekund'));
}

$result = implode(' ', $output);

// output the result
echo $result;
?>