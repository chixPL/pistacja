let counter = 0;
let elem = document.getElementById("changeText");
let inst = setInterval(change, 1000);

function change() {
  elem.innerHTML = "Restart za " + (5-counter) + " sekund";
  counter++;
}

/*
setTimeout(function(){
    window.location.reload(1);
 }, 5000);
*/