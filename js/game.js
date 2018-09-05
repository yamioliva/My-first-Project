function Game(idCanvas) {
  this.canvas = document.getElementById(idCanvas);
  this.ctx = this.canvas.getContext("2d");
  this.init();
  this.fps = 60;
}

Game.prototype.init = function() {
  this.myObstacles = [];
  this.player = new Player(this);
  this.frames = 0;
  this.points = 0;
};

Game.prototype.createCanvas = function() {
  var lines = 0;

  /* this.ctx.fillStyle = "green";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); */
  this.ctx.fillStyle = "#DAB485";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  

  /* this.background = new Image();
  this.background.src = "img/background-grass.jpg";

  this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height); */
};

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.drawAll();
      this.moveAll();

      this.frames += 1;
      if (this.frames > 1000) this.frames = 0;
      if (this.frames % 240 === 0) {
        this.myObstacles.push(new Obstacle(this));
      }

      this.points = Math.floor(this.frames / 5);

      if (this.checkCollision() || this.player.outCanvas()) {
        this.stop();
      }
    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawAll = function() {
  this.createCanvas();
  this.myObstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.myObstacles.forEach(function(obstacle) {
    obstacle.move();
  });
  this.player.move();
};

Game.prototype.checkCollision = function() {
  return this.myObstacles.some(
    function(obstacle) {
      return this.player.crashWith(obstacle);
    }.bind(this)
  );
};

Game.prototype.stop = function() {
  clearInterval(this.intervalId);
  this.gameOver();
};

Game.prototype.gameOver = function() {
  this.clear();
  this.drawFinalPoints();
};

Game.prototype.drawFinalPoints = function() {
  this.ctx.fillStyle = "grey";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.font = "34px Verdana";
  this.ctx.fillStyle = "#870007";
  this.ctx.fillText("You are lost!", 100, 250);
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Your final score", 70, 300);
  this.ctx.fillText(this.points, 150, 340);
};
