function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  player = new Component(
    30,
    70,
    "../img/ciclistaplayer.png",
    myGameArea.canvas.width / 2 - 15,
    myGameArea.canvas.height - 100,
    "player"
  );

  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {
    this.clear();
  });
};
