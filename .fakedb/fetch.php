<?php
  $file = file('.db/stdout.txt', FILE_IGNORE_NEW_LINES);
?>
<span class="login">user@user-PC:</span><span class="tilde">~</span>$ neofetch
<div class="row">
<div class="col-auto">
<span class="ansi31"></span><span class="ansi1 ansi31">            .-/+oossssoo+/-.
        `:+ssssssssssssssssss+:`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">dMMMNy</span><span class="ansi31"></span><span class="ansi1 ansi31">sssso.
   /sssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hdmmNNmmyNMMMMh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssss/
  +sssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hm</span><span class="ansi31"></span><span class="ansi1 ansi31">yd</span><span class="ansi1 ansi37"></span><span class="ansi1">MMMMMMMNddddy</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss+
 /ssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hNMMM</span><span class="ansi31"></span><span class="ansi1 ansi31">yh</span><span class="ansi1 ansi37"></span><span class="ansi1">hyyyyhmNMMMNh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss/
.ssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">dMMMNh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hNMMMd</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss.
+ssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hhhyNMMNy</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">yNMMMy</span><span class="ansi31"></span><span class="ansi1 ansi31">sssssss+
oss</span><span class="ansi1 ansi37"></span><span class="ansi1">yNMMMNyMMh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hmmmh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssso
oss</span><span class="ansi1 ansi37"></span><span class="ansi1">yNMMMNyMMh</span><span class="ansi31"></span><span class="ansi1 ansi31">sssssssssssssshmmmh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssso
+ssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hhhyNMMNy</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">yNMMMy</span><span class="ansi31"></span><span class="ansi1 ansi31">sssssss+
.ssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">dMMMNh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hNMMMd</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss.
 /ssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hNMMM</span><span class="ansi31"></span><span class="ansi1 ansi31">yh</span><span class="ansi1 ansi37"></span><span class="ansi1">hyyyyhdNMMMNh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss/
  +sssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">dm</span><span class="ansi31"></span><span class="ansi1 ansi31">yd</span><span class="ansi1 ansi37"></span><span class="ansi1">MMMMMMMMddddy</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssssss+
   /sssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">hdmNNNNmyNMMMMh</span><span class="ansi31"></span><span class="ansi1 ansi31">ssssss/
    .ossssssssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">dMMMNy</span><span class="ansi31"></span><span class="ansi1 ansi31">sssso.
      -+sssssssssssssssss</span><span class="ansi1 ansi37"></span><span class="ansi1">yyy</span><span class="ansi31"></span><span class="ansi1 ansi31">ssss+-
        `:+ssssssssssssssssss+:`
            .-/+oossssoo+/-.<span class="ansi1"></span><span class="ansi1 ansi31"></span>
</div>
<div class="col">
<span class="ansi1 ansi31">user</span>@<span class="ansi31"></span><span class="ansi1 ansi31">user-PC</span> 
-------------- 
<span class="ansi31"></span><span class="ansi1 ansi31">OS</span>:<span class="ansi38-15"> <?= substr($file[2], 4); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Host</span>:<span class="ansi38-15"> <?= substr($file[3], 6); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Kernel</span>:<span class="ansi38-15"> <?= substr($file[4], 8);?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Uptime</span>:<span class="ansi38-15"> <?= substr($file[5], 8); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Packages</span>:<span class="ansi38-15"> <?= substr($file[6], 10);  ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Shell</span>:<span class="ansi38-15"> <?= substr($file[7], 7); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Resolution</span>:<span class="ansi38-15"> <?= substr($file[8], 12); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">DE</span>:<span class="ansi38-15"> <?= substr($file[9], 4); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">WM</span>:<span class="ansi38-15"> <?= substr($file[10], 4); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">WM Theme</span>:<span class="ansi38-15"> <?= substr($file[11], 10); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Theme</span>:<span class="ansi38-15"> <?= substr($file[12], 7); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Icons</span>:<span class="ansi38-15"> <?= substr($file[13], 7); ?> </span> 
<span class="ansi31"></span><span class="ansi1 ansi31">Terminal</span>:<span class="ansi38-15"> <?= substr($file[14], 10); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">CPU</span>:<span class="ansi38-15"> <?= substr($file[15], 5); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">GPU</span>:<span class="ansi38-15"> <?= substr($file[16], 5); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Memory</span>:<span class="ansi38-15"> <?= substr($file[17], 8); ?> </span>

<span class="ansi30"></span><span class="ansi30 ansi40">   </span><span class="ansi31 ansi40"></span><span class="ansi31 ansi41">   </span><span class="ansi32 ansi41"></span><span class="ansi32 ansi42">   </span><span class="ansi33 ansi42"></span><span class="ansi33 ansi43">   </span><span class="ansi34 ansi43"></span><span class="ansi34 ansi44">   </span><span class="ansi35 ansi44"></span><span class="ansi35 ansi45">   </span><span class="ansi36 ansi45"></span><span class="ansi36 ansi46">   </span><span class="ansi37 ansi46"></span><span class="ansi37 ansi47">   </span>
<span class="ansi38-8"></span><span class="ansi38-8 ansi48-8">   </span><span class="ansi38-9 ansi48-8"></span><span class="ansi38-9 ansi48-9">   </span><span class="ansi38-10 ansi48-9"></span><span class="ansi38-10 ansi48-10">   </span><span class="ansi38-11 ansi48-10"></span><span class="ansi38-11 ansi48-11">   </span><span class="ansi38-12 ansi48-11"></span><span class="ansi38-12 ansi48-12">   </span><span class="ansi38-13 ansi48-12"></span><span class="ansi38-13 ansi48-13">   </span><span class="ansi38-14 ansi48-13"></span><span class="ansi38-14 ansi48-14">   </span><span class="ansi38-15 ansi48-14"></span><span class="ansi38-15 ansi48-15">   </span>
</div>
</div>