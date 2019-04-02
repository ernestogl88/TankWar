var Game = {
  canvas: undefined,
  ctx: undefined,
  player: undefined,
  fps: 60,
  enemies: [],
  obstacles: [],
  counter: 0,
  init(canvasId) {
    this.canvas = document.querySelector(canvasId);
    this.canvas.setAttribute("height", window.innerHeight);
    this.canvas.setAttribute("width", window.innerWidth);
    this.ctx = this.canvas.getContext('2d');
    this.start();
  },

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      this.counter++;
      this.clearBoard();
      this.background.draw();
      this.player.draw();
      if (this.player.bullets.length != 0) {
        this.player.bullets = this.clearBullets(this.player.bullets);
        this.player.bullets = this.player.bullets.filter(bullet=>{
          if (!this.checkBulletsCollisions(bullet)) return bullet;
        });
      }
      this.checkPlayerCollisions(this.player);
      this.enemies.forEach(tank => {
        this.checkEnemiesCollisions(tank);
        tank.draw();
        tank.move();
        if (this.counter % 60 == 0) tank.moveRandom(['u', 'd', 'l', 'r']);
        if (this.counter % 90 == 0) tank.shoot();
        tank.bullets = this.clearBullets(tank.bullets);
      });
      this.obstacles.forEach(obstacle => obstacle.draw());
    }, 1000 / this.fps);

  },
  setCanvasDimension() {
    // this.canvas.setAttribute("height", window.outerHeight);
    // this.canvas.setAttribute("width", window.innerWidth);
  },
  reset() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx, 1130, 25);
    this.enemies = [new Tank(this.ctx, 185, 25), new Tank(this.ctx, 185, 80), new Tank(this.ctx, 185, 150)];
    this.obstacles = [new Obstacle(this.ctx, 600, 100), new Obstacle(this.ctx, 400, 250), new Obstacle(this.ctx, 400, 400)];
  },
  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  clearBullets(bullets) {
    return bullets = bullets.filter(bullet => {
      return bullet.y < 600 - bullet.img.height / 2 &&
        bullet.y > 20 &&
        bullet.x < 1180 - bullet.img.width / 2 &&
        bullet.x > 180;
    });
  },
  checkCollision(object1, object2) {
    if (object2.x < object1.x + object1.img.width / 2 &&
      object1.x < object2.x + object2.img.width / 2 &&
      object2.y < object1.y + object1.img.height / 2 &&
      object1.y < object2.y + object2.img.height / 2) return true;
    else return false;
  },
  checkPlayerCollisions(player) {
    if (this.obstacles.length === 0) return false;
    else {
      this.obstacles.forEach(obstacle => {
        if (this.checkCollision(player, obstacle)) {
          switch (player.sense) {
            case 'u':
              player.y = obstacle.y + obstacle.img.height / 2;
              break;
            case 'd':
              player.y = obstacle.y - player.img.height / 2;
              break;
            case 'l':
              player.x = obstacle.x + obstacle.img.width / 2;
              break;
            case 'r':
              player.x = obstacle.x - player.img.width / 2;
              break;
          }
        }
      });
    }
  },
  checkEnemiesCollisions(tank) {
    if (this.obstacles.length === 0) return false;
    else {
      this.obstacles.forEach(obstacle => {
        if (this.checkCollision(tank, obstacle)) {
          switch (tank.sense) {
            case 'u':
              tank.y = obstacle.y + obstacle.img.height / 2;
              tank.moveRandom(['l', 'r']);
              break;
            case 'd':
              tank.y = obstacle.y - tank.img.height / 2;
              tank.moveRandom(['l', 'r']);
              break;
            case 'l':
              tank.x = obstacle.x + obstacle.img.width / 2;
              tank.moveRandom(['u', 'd']);
              break;
            case 'r':
              tank.x = obstacle.x - tank.img.width / 2;
              tank.moveRandom(['u', 'd']);
              break;
          }
        }
      });
    }
  },

  checkBulletsCollisions(bullet) {
    var control = this.obstacles.length;
    if (this.obstacles.length === 0) return false;
    else {
        this.obstacles = this.obstacles.filter(obstacle => {
          if (!this.checkCollision(bullet, obstacle)) return obstacle;
        });
        
    }
    if(this.obstacles.length<control) return true;
  }
}