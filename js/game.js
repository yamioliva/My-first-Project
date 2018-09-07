function Game(idCanvas) {
  this.canvas = document.getElementById(idCanvas);
  this.ctx = this.canvas.getContext("2d");
  this.init();
  this.fps = 60;
  this.music = new Audio("sound/audiobikerecort.mp3");
  this.music.play();
  this.music.loop = true;
}

Game.prototype.init = function() {
  this.background = new Background(this);
  this.myObstacles = [];
  this.deco = [];
  this.player = new Player(this);
  this.frames = 0;
  this.points = 0;
  this.levelFrequency = 120;
};

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.drawAll();
      this.moveAll();

      this.frames += 1;
      //mil es un control para que a la hora de sumar frames no suba demasiado el valor.
      if (this.frames > 1000) this.frames = 0;
      // módulos de 100 para que controlar la frecuencia.
      if (this.points % 100 == 0 && this.levelFrequency > 5) {
        this.levelFrequency -= 5;
      }
      if (this.frames % this.levelFrequency === 0) {
        this.myObstacles.push(new Obstacle(this));
      }
      if (this.frames % 200 === 0) {
        this.deco.push(new Deco(this));
      }

      this.points += 1;

      if (this.checkCollision() || this.player.outCanvas()) {
        this.stop();
      }
      //que sume 1000 para que se note la diferencia de puntos, puede ser cualquiera.
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
  this.background.draw();
  this.myObstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.deco.forEach(function(deco) {
    deco.draw();
  });
  this.player.draw();
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.deco.forEach(function(deco) {
    deco.move();
  });
  this.myObstacles.forEach(function(obstacle) {
    obstacle.move();
  });
  this.player.move();
};

Game.prototype.giftCollision = function() {
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
  this.ctx.fillText("Supera a Juan si puedes!", 100, 250);
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Juan tiene el récord!", 70, 300);
  this.ctx.fillText(this.points, 150, 340);
};
