function Player(game) {
  this.game = game;
  this.width = 40;
  this.height = 70;
  this.x = this.game.canvas.width / 2 - 30;
  this.y = 10;

  this.dx = 0;
  this.dy = 0;

  this.img = new Image();
  this.img.src = "img/ciclistaplayer.png";

  this.setListeners();
}

Player.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    if (
      e.keyCode ==
      KEY_RIGHT /* &&
      this.x < this.game.canvas.width - this.width - 5 */
    ) {
      this.dx = 3;
      this.img.src = "img/ciclistaplayer.png";
    }

    if (e.keyCode == KEY_LEFT /* && this.x > 5 */) {
      this.dx = -3;
      this.img.src = "img/ciclista-left.png";
    }

    if (e.keyCode == KEY_DOWN) {
      this.dy = 3;
    }
    if (e.keyCode == KEY_UP) {
      this.dy = -3;
    }
  }.bind(this);

  document.onkeyup = function(e) {
    if (e.keyCode == KEY_RIGHT) {
      this.dx = 0;
    }

    if (e.keyCode == KEY_LEFT) {
      this.dx = 0;
    }

    if (e.keyCode == KEY_UP) {
      this.dy = 0;
    }

    if (e.keyCode == KEY_DOWN) {
      this.dy = 0;
    }
  }.bind(this);
};

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Player.prototype.move = function() {
  console.log(this.x);
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > this.game.canvas.width - this.width) {
    this.x = this.game.canvas.width - this.width;
  }

  this.x += this.dx;
  this.y += this.dy;
};

Player.prototype.outCanvas = function() {
  return this.y > this.game.canvas.height - this.height;
};

Player.prototype.crashWith = function(obstacle) {
  return (
    this.x + this.width > obstacle.x &&
    obstacle.x + obstacle.width > this.x &&
    this.y + this.height > obstacle.y &&
    obstacle.y + obstacle.height > this.y
  );
};

var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_UP = 38;
