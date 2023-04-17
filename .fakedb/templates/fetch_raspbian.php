<?php
  $file = file('.db/stdout.txt', FILE_IGNORE_NEW_LINES);
?>
<span class="login"><?=$file[0]?></span>:<span class="tilde">~ $</span> neofetch
<div class="row">
<div class="col-auto">
<span class="ansi32"></span><span class="ansi1 ansi32">  `.::///+:/-.        --///+//-:``
 `+oooooooooooo:   `+oooooooooooo:
  /oooo++//ooooo:  ooooo+//+ooooo.
  `+ooooooo:-:oo-  +o+::/ooooooo:
   `:oooooooo+``    `.oooooooo+-
     `:++ooo/.        :+ooo+/.`
        </span><span class="ansi31"></span><span class="ansi1 ansi31">...`  `.----.` ``..
     .::::-``:::::::::.`-:::-`
    -:::-`   .:::::::-`  `-:::-
   `::.  `.--.`  `` `.---.``.::`
       .::::::::`  -::::::::` `
 .::` .:::::::::- `::::::::::``::.
-:::` ::::::::::.  ::::::::::.`:::-
::::  -::::::::.   `-::::::::  ::::
-::-   .-:::-.``....``.-::-.   -::-
 .. ``       .::::::::.     `..`..
   -:::-`   -::::::::::`  .:::::`
   :::::::` -::::::::::` :::::::.
   .:::::::  -::::::::. ::::::::
    `-:::::`   ..--.`   ::::::.
      `...`  `...--..`  `...`
            .::::::::::
             `.-::::-`
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
<span class="ansi31"></span><span class="ansi1 ansi31">DE</span>:<span class="ansi38-15"> <?= substr($file[8], 4); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Theme</span>:<span class="ansi38-15"> <?= substr($file[9], 7); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Icons</span>:<span class="ansi38-15"> <?= substr($file[10], 7); ?> </span> 
<span class="ansi31"></span><span class="ansi1 ansi31">Terminal</span>:<span class="ansi38-15"> <?= substr($file[11], 10); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Terminal Font</span>:<span class="ansi38-15"> <?= substr($file[12], 15); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">CPU</span>:<span class="ansi38-15"> <?= substr($file[13], 5); ?> </span>
<span class="ansi31"></span><span class="ansi1 ansi31">Memory</span>:<span class="ansi38-15"> <?= substr($file[14], 8); ?> </span>

<span class="ansi30"></span><span class="ansi30 ansi40">   </span><span class="ansi31 ansi40"></span><span class="ansi31 ansi41">   </span><span class="ansi32 ansi41"></span><span class="ansi32 ansi42">   </span><span class="ansi33 ansi42"></span><span class="ansi33 ansi43">   </span><span class="ansi34 ansi43"></span><span class="ansi34 ansi44">   </span><span class="ansi35 ansi44"></span><span class="ansi35 ansi45">   </span><span class="ansi36 ansi45"></span><span class="ansi36 ansi46">   </span><span class="ansi37 ansi46"></span><span class="ansi37 ansi47">   </span>
<span class="ansi38-8"></span><span class="ansi38-8 ansi48-8">   </span><span class="ansi38-9 ansi48-8"></span><span class="ansi38-9 ansi48-9">   </span><span class="ansi38-10 ansi48-9"></span><span class="ansi38-10 ansi48-10">   </span><span class="ansi38-11 ansi48-10"></span><span class="ansi38-11 ansi48-11">   </span><span class="ansi38-12 ansi48-11"></span><span class="ansi38-12 ansi48-12">   </span><span class="ansi38-13 ansi48-12"></span><span class="ansi38-13 ansi48-13">   </span><span class="ansi38-14 ansi48-13"></span><span class="ansi38-14 ansi48-14">   </span><span class="ansi38-15 ansi48-14"></span><span class="ansi38-15 ansi48-15">   </span>
</div>
</div>