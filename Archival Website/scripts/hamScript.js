const hamburger = document.getElementById("ham-burger");
const hamcross = document.getElementById("ham-cross");
const hammenu = document.getElementById("ham-menu");

hamcross.style.display = "none";

function hamOpen() {
        hamburger.style.display = "none";
        hamcross.style.display = "block";
        hammenu.style.display = "block";
    }

function hamClose() {
        hamburger.style.display = "block";
        hamcross.style.display = "none";
        hammenu.style.display = "none";
    }

function mobileTrigger(windowx) {
  if (windowx.matches) { // If media query matches
    hamClose()
  } else {
   	hammenu.style.display = "grid";
  }
}

var windowx = window.matchMedia("(max-width: 767px)")
mobileTrigger(windowx) // Call listener function at run time
windowx.addListener(mobileTrigger) // Attach listener function on state changes