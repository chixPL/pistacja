let counter = 0;
let text = document.getElementById("changeText");
let progressbar = document.getElementById("resetprogress")
let inst = setInterval(change, 1000);

function change() {
  text.innerHTML = "Restart za " + (5-counter) + " sekund";
  progressbar.style = "width: " + counter*20 + "%";
  progressbar.ariaValueNow = counter*20;
  counter++;

  /* testowa funkcja */
  if(counter > 5){
    counter = 0;
  }

}

/*
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
*/