<?php
  $file = file('.db/stdout.txt');
?>

<span style="color:#A00"><b>        .-/+oossssoo+/-.
    `:+ssssssssssssssssss+:`
  -+ssssssssssssssssssyyssss+-
.ossssssssssssssssss<span style="color:#AAA"></span></b></span><b>dMMMNy</b><span style="color:#A00"><b>sssso.
/sssssssssss<span style="color:#AAA"></span></b></span><b>hdmmNNmmyNMMMMh</b><span style="color:#A00"><b>ssssss/
+sssssssss<span style="color:#AAA"></span></b></span><b>hm</b><span style="color:#A00"><b>yd<span style="color:#AAA"></span></b></span><b>MMMMMMMNddddy</b><span style="color:#A00"><b>ssssssss+
/ssssssss<span style="color:#AAA"></span></b></span><b>hNMMM</b><span style="color:#A00"><b>yh<span style="color:#AAA"></span></b></span><b>hyyyyhmNMMMNh</b><span style="color:#A00"><b>ssssssss/
.ssssssss<span style="color:#AAA"></span></b></span><b>dMMMNh</b><span style="color:#A00"><b>ssssssssss<span style="color:#AAA"></span></b></span><b>hNMMMd</b><span style="color:#A00"><b>ssssssss.
+ssss<span style="color:#AAA"></span></b></span><b>hhhyNMMNy</b><span style="color:#A00"><b>ssssssssssss<span style="color:#AAA"></span></b></span><b>yNMMMy</b><span style="color:#A00"><b>sssssss+
oss<span style="color:#AAA"></span></b></span><b>yNMMMNyMMh</b><span style="color:#A00"><b>ssssssssssssss<span style="color:#AAA"></span></b></span><b>hmmmh</b><span style="color:#A00"><b>ssssssso
oss<span style="color:#AAA"></span></b></span><b>yNMMMNyMMh</b><span style="color:#A00"><b>sssssssssssssshmmmh</b></span><span style="color:#A00"><b>ssssssso
+ssss<span style="color:#AAA"></span></b></span><b>hhhyNMMNy</b><span style="color:#A00"><b>ssssssssssss<span style="color:#AAA"></span></b></span><b>yNMMMy</b><span style="color:#A00"><b>sssssss+
.ssssssss<span style="color:#AAA"></span></b></span><b>dMMMNh</b><span style="color:#A00"><b>ssssssssss<span style="color:#AAA"></span></b></span><b>hNMMMd</b><span style="color:#A00"><b>ssssssss.
/ssssssss<span style="color:#AAA"></span></b></span><b>hNMMM</b><span style="color:#A00"><b>yh<span style="color:#AAA"></span></b></span><b>hyyyyhdNMMMNh</b><span style="color:#A00"><b>ssssssss/
+sssssssss<span style="color:#AAA"></span></b></span><b>dm</b><span style="color:#A00"><b>yd<span style="color:#AAA"></span></b></span><b>MMMMMMMMddddy</b><span style="color:#A00"><b>ssssssss+
/sssssssssss<span style="color:#AAA"></span></b></span><b>hdmNNNNmyNMMMMh</b><span style="color:#A00"><b>ssssss/
.ossssssssssssssssss<span style="color:#AAA"></span></b></span><b>dMMMNy</b><span style="color:#A00"><b>sssso.
  -+sssssssssssssssss<span style="color:#AAA"></span></b></span><b>yyy</b><span style="color:#A00"><b>ssss+-
    `:+ssssssssssssssssss+:`
        .-/+oossssoo+/-.</b></span>
<b><span style="color:#A00"><b>user</b></span></b>@<span style="color:#A00"><b>computername</b></span> 
--------------------------- 
<span style="color:#A00"><b>OS</b></span>: <?php echo substr($file[2], 4); ?>
<span style="color:#A00"><b>Host</b></span>: <?php echo substr($file[3], 6); ?>
<?php // z jakiegoś powodu te poniższe 3 tabelki wymagają pozbycia się newline ?>
<span style="color:#A00"><b>Kernel</b></span>: <?php echo substr($file[4], 8);?>
<span style="color:#A00"><b>Uptime</b></span>: <?php echo substr(str_replace("\n", "", $file[5]), 8); ?>  
<span style="color:#A00"><b>Packages</b></span>: <?php echo substr(str_replace("\n", "", $file[6]), 10);  ?> 
<span style="color:#A00"><b>Shell</b></span>: <?php echo substr($file[7], 7); ?>
<span style="color:#A00"><b>Terminal</b></span>: <?php echo substr($file[8], 12); ?>
<span style="color:#A00"><b>CPU</b></span>: <?php echo substr($file[15], 5); ?>
<span style="color:#A00"><b>Memory</b></span>: <?php echo substr($file[16], 5); ?>

<span style="color:#000"><span style="background-color:#000">   <span style="color:#A00"><span style="background-color:#A00">   <span style="color:#0A0"><span style="background-color:#0A0">   <span style="color:#A50"><span style="background-color:#A50">   <span style="color:#00A"><span style="background-color:#00A">   <span style="color:#A0A"><span style="background-color:#A0A">   <span style="color:#0AA"><span style="background-color:#0AA">   <span style="color:#AAA"><span style="background-color:#AAA">   </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
<span style="color:#555"><span style="background-color:#555">   <span style="color:#F55"><span style="background-color:#F55">   <span style="color:#5F5"><span style="background-color:#5F5">   <span style="color:#FF5"><span style="background-color:#FF5">   <span style="color:#55F"><span style="background-color:#55F">   <span style="color:#F5F"><span style="background-color:#F5F">   <span style="color:#5FF"><span style="background-color:#5FF">   <span style="color:#FFF"><span style="background-color:#FFF">   </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>

