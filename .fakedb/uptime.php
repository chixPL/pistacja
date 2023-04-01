<?php
include('db_connect.php');

function unixTime2text($time) {
    $value['y'] = floor($time/31536000);
    $value['w'] = floor(($time-($value['y']*31536000))/604800);
    $value['d'] = floor(($time-($value['y']*31536000+$value['w']*604800))/86400);
    $value['h'] = floor(($time-($value['y']*31536000+$value['w']*604800+$value['d']*86400))/3600);
    $value['m'] = floor(($time-($value['y']*31536000+$value['w']*604800+$value['d']*86400+$value['h']*3600))/60);
    $value['s'] = $time-($value['y']*31536000+$value['w']*604800+$value['d']*86400+$value['h']*3600+$value['m']*60);

    $unit['y'] = 'lat';
    $unit['w'] = 'tygodni';
    $unit['d'] = 'dni';
    $unit['h'] = 'godzin';
    $unit['m'] = 'minut';
    $unit['s'] = 'sekund';

    foreach($value as $key => $val) {
        if (!empty($val)) {
            $not_null_values[] .= $val . ' ' . $unit[$key];
        }
    }
}

$sql = "SELECT start_time FROM start_times ORDER BY start_time DESC LIMIT 1";
$query = mysqli_query($conn, $sql);
$startTime = mysqli_fetch_row($query);

echo unixTime2text(time() - $startTime[0]);
?>