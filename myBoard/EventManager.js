
var key = {
    RIGHT : 39, 
    LEFT : 37   
};

var eventManager = {};

document.addEventListener("keydown", function(e) {
  eventManager[e.keyCode] = true;
}, true);
document.addEventListener("keyup", function(e) {
  eventManager[e.keyCode] = false;
}, true);
