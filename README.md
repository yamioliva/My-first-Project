JUEGO SENCILLO REALIZADO CON HTML, CSS, Javascript y canvas.
PARA EMPEZAR A JUGAR: https://yamioliva.github.io/My-first-Project/ 
EJEMPLO DE CÓDIGO:

function Background(game) {
  this.game = game;
  this.img = new Image();
  this.img.src = "img/road2.png";
  this.x = 0;
  this.y = 0;
  this.dy = 5;
}
----------------------------------------------------------------------------------------------------------------------------
Player.prototype.move = function() {
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > this.game.canvas.width - this.width) {
    this.x = this.game.canvas.width - this.width;
  }

  this.x += this.dx;
  this.y += this.dy;
};
