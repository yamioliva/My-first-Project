window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("canvas").style.display = "block";
    var game = new Game("canvas");
    game.start();
  };
};
