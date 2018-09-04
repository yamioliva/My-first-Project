window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  function startGame() {
    myGameArea.myObstacles = [];
    myGameArea.start();
    player = new Component(30, 70, "img/ciclistaplayer.png", (myGameArea.canvas.width/2) - 15, myGameArea.canvas.height - 100, "player");
  }
  var lines = 0;
  var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
      this.canvas.width = screen.width - screen.width * 0.7;
      this.canvas.height = screen.height - screen.height * 0.25;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    backgroud: function() {
      this.context.fillStyle = "green";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = "white";
      this.context.fillRect(30, 0, this.canvas.width-60, this.canvas.height);
      this.context.fillRect(this.canvas.width - 50, 0, 10, this.canvas.height);
      for (i=0;i<Math.ceil(this.canvas.height/35);i++) {
        lines += 0.1;
        this.context.fillRect(this.canvas.width/2-5, 40*i+(lines%40), 5, 20);
      }
    },
    myObstacles: [],
    frames: 0,
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function() {
      points = (Math.floor(this.frames / 5));
      this.context.font = '20px Verdana';
      this.context.fillStyle = 'black';
      this.context.fillText('Score: ' + points, 60, 40);
    },
    stop: function() {
      cancelAnimationFrame(this.reqAnimation);
      this.gameOver();
    },
    gameOver: function() {
      this.clear();
      this.drawFinalPoints();
    },
    drawFinalPoints: function() {
      this.context.fillStyle = "grey";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.font = '34px Verdana';
      this.context.fillStyle = '#870007';
      this.context.fillText('You are lost!', 100, 250);
      this.context.fillStyle = 'white';
      this.context.fillText('Your final score', 70, 300);
      this.context.fillText(points, 150, 340);
    }
  };
  function Component(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.x = x;
    this.y = y;
    if (this.type == "player") { this.image = new Image(); }
    this.update = function() {
      ctx = myGameArea.context;
      if(this.type == "player"){
        this.image.src = color;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    };
    this.left = function() { return this.x; };
    this.right = function() { return (this.x + this.width); };
    this.top = function() { return this.y; };
    this.bottom = function() { return this.y + (this.height); };
    this.crashWith = function(obstacle) {
      return !((player.bottom() < obstacle.top()) ||
        (player.top() > obstacle.bottom()) ||
        (player.right() < obstacle.left()) ||
        (player.left() > obstacle.right()));
    };
  }
  function updateGameArea() {
    for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
      if (player.crashWith(myGameArea.myObstacles[i])) {
        myGameArea.stop();
        return;
      }
    }
    myGameArea.clear();
    myGameArea.backgroud();
    drawObstacles();
    myGameArea.frames += 1;
    for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
      myGameArea.myObstacles[i].y += 1;
      myGameArea.myObstacles[i].update();
    }
    player.update();
    myGameArea.score();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }
  function drawObstacles() {
    if (myGameArea.frames % 140 === 0) {
      minWidth = (myGameArea.canvas.width - 80)*0.3;
      maxWidth = (myGameArea.canvas.width - 80)*0.7;
      width = minWidth + Math.floor(Math.random()*(maxWidth-minWidth));
      posX = 40 + (Math.floor(Math.random() * (myGameArea.canvas.width-80-width)));
      myGameArea.myObstacles.push(new Component(width, 20, "grey", posX, 0));
    }
  }
  document.onkeydown = function(e) {
    if (e.keyCode == 39 && player.x < (myGameArea.canvas.width - player.width - 55)) {
      player.x += 10;
    }
    if (e.keyCode == 37 && player.x > 55) {
      player.x -= 10;
    }
  };
};
