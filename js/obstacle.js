function Obstacle(game) {
  this.game = game;
  this.height = 20;
  this.minWidth = this.game.canvas.width * 0.1;
  this.maxWidth = this.game.canvas.width * 0.2;
  this.width =
    this.minWidth + Math.floor(Math.random() * (this.maxWidth - this.minWidth));
  this.x =
    40 + Math.floor(Math.random() * (this.game.canvas.width - 80 - this.width));
  this.y = this.game.canvas.height;
  console.log(this.minWidth, this.maxWidth);
}

Obstacle.prototype.draw = function() {
  this.game.ctx.fillStyle = "grey";
  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Obstacle.prototype.move = function() {
  this.y -= 15;
};
