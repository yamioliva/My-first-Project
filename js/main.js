window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

function play(){
  var audio = document.getElementById("audio");
  audio.play();
}