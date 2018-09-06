function Game(idCanvas) {
  this.canvas = document.getElementById(idCanvas);
  this.ctx = this.canvas.getContext("2d");
  this.init();
  this.fps = 60;
  this.music = new Audio("sound/audiobikerecort.mp3");
  this.music.play();
  this.music.loop = true;
  /* this.crash = new Audio ("");
  this.crash.loop = true; */
}

Game.prototype.init = function() {
  this.myObstacles = [];
  this.deco = [];
  this.player = new Player(this);
  this.frames = 0;
  this.points = 0;
  this.background = new Image();
  this.background.src = "img/road2.png";
  this.levelFrequency = 120;
};

Game.prototype.createCanvas = function() {
/*   var lines = 0;
 */  /* this.ctx.fillStyle = "green";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); */
  /* this.ctx.fillStyle = "#DAB485";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); */

  this.ctx.drawImage(
    this.background,
    0,
    0,
    this.canvas.width,
    this.canvas.height
  );
};

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      //console.log(this.points);
      this.clear();
      this.drawAll();
      this.moveAll();

      this.frames += 1;
      if (this.frames > 1000) this.frames = 0;
      //console.log(this.levelFrequency);
      if (this.points % 100 == 0 && this.levelFrequency > 5) {
        this.levelFrequency -= 5;
      }
      if (this.frames % this.levelFrequency === 0) {
        this.myObstacles.push(new Obstacle(this));
      } /* 
      } else {
        if (this.frames % 60 === 0) {
          this.myObstacles.push(new Obstacle(this));
        }
      } */
      if (this.frames % 200 === 0) {
        this.deco.push(new Deco(this));
      }

      this.points += 1;

      if (this.checkCollision() || this.player.outCanvas()) {
        this.stop();
      }

      if (this.giftCollision()) {
        this.points += 1000;
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
  this.deco.forEach(function(deco) {
    deco.draw();
  });
  this.myObstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.deco.forEach(function(deco) {
    deco.move();
  });
  this.myObstacles.forEach(function(obstacle) {
    obstacle.move();
  });
  this.player.move();
};

Game.prototype.giftCollision = function() {
  /*   this.crash.play();
 */
  return this.deco.some(
    function(deco) {
      if (this.player.crashDeco(deco)) {
        this.deco.splice(deco, 1);
        return true;
      } else {
        return false;
      }
    }.bind(this)
  );
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
  this.music.pause();
  this.gameOver();
};

Game.prototype.gameOver = function() {
  this.clear();
  this.drawFinalPoints();
  this.init();
};

Game.prototype.drawFinalPoints = function() {
  this.ctx.fillStyle = "#122730";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.font = "34px Verdana";
  this.ctx.fillStyle = "#870007";
  this.ctx.fillText("Game Over!", 100, 250);
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Your final score", 70, 300);
  this.ctx.fillText(this.points, 150, 340);
};
