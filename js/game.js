var Game = {
  canvas: undefined,
  ctx: undefined,
  player: undefined,
  fps: 60,
  enemies: [],
  obstacles: [],
  counter: 0,
  level: 0,
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
      this.goal.draw();
      this.scoreBoard.draw(this.player.lifePoints);
      this.player.draw();
      if (this.player.bullets.length != 0) {
        this.player.bullets = this.clearBullets(this.player.bullets);
        this.player.bullets = this.player.bullets.filter(bullet => {
        if (!this.checkBulletObstacle(bullet) &&
            !this.checkBulletEnemies(bullet)) return bullet;
        });
      }
      this.player.checkPlayerCollisions(this.obstacles,this.enemies);
      if (this.checkCollision(this.player,this.goal))this.clearLevel();
      this.enemies.forEach(tank => {
        tank.checkEnemiesCollisions(this.obstacles,this.enemies,this.player);
        tank.draw();
        tank.move();
        if (this.counter % 90 == 0) tank.moveRandom(['u', 'd', 'l', 'r']);
        if (this.counter % 120 == 0) tank.shoot();
        tank.bullets = this.clearBullets(tank.bullets);
        tank.bullets = tank.bullets.filter(bullet => {
          if (!this.checkBulletObstacle(bullet) &&
              !this.checkBulletPlayer(bullet)) return bullet;

        });
      });
      this.obstacles.forEach(obstacle => obstacle.draw());
    }, 1000 / this.fps);

  },
  setCanvasDimension() {
    // this.canvas.setAttribute("height", window.outerHeight);
    // this.canvas.setAttribute("width", window.innerWidth);
  },
  reset() {
    if (this.level === 0) {
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx, 1050, 25);
      this.enemies = [new Tank(this.ctx, 550, 200), new Tank(this.ctx, 300, 500), new Tank(this.ctx, 185, 150)];
      this.generateDiagonalObstacles(9,170,70);
      this.generateDiagonalObstacles(9,470,70);
      this.generateDiagonalObstacles(5,770,70);
      this.generateDiagonalObstacles(4,170,320);
      this.goal = new Cross(105, 540, this.ctx);
      this.scoreBoard = new Scoreboard(1100, 25, this.ctx);
    }
    if (this.level === 1){
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx, 1050, 25);
      this.enemies = [new Tank(this.ctx, 550, 200), new Tank(this.ctx, 300, 500), new Tank(this.ctx, 185, 150)];
      this.generateHorizontalObstacles(17,170,80);
      this.generateHorizontalObstacles(17,170,210);
      this.generateHorizontalObstacles(17,170,340);
      this.generateHorizontalObstacles(17,170,470);
      this.generateVerticalObstacles(7,300,135);
      this.generateVerticalObstacles(7,800,135);
      this.generateVerticalObstacles(7,550,135);
      this.goal = new Cross(370, 285, this.ctx);
      this.scoreBoard = new Scoreboard(1100, 25, this.ctx);
    }


  },
  checkCollision(object1, object2) {
    if (object2.x < object1.x + object1.img.width / 2 &&
      object1.x < object2.x + object2.img.width / 2 &&
      object2.y < object1.y + object1.img.height / 2 &&
      object1.y < object2.y + object2.img.height / 2) return true;
    else return false;
  },
  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  clearBullets(bullets) {
    return bullets = bullets.filter(bullet => {
      return bullet.y < 600 - bullet.img.height / 2 &&
        bullet.y > 20 &&
        bullet.x < 1100 - bullet.img.width / 2 &&
        bullet.x > 100;
    });
  },
 checkBulletObstacle(bullet) {
    var control = this.obstacles.length;
    if (this.obstacles.length === 0) return false;
    else {
      this.obstacles = this.obstacles.filter(obstacle => {
        if (!this.checkCollision(bullet, obstacle)) return obstacle;
        if (this.checkCollision(bullet,obstacle)) {
          obstacle.getHit();
          if (obstacle.resistance >0) return obstacle;
        }
      });
    }
    if (this.obstacles.length < control) return true;
  },
  checkBulletPlayer(bullet){
    if (this.checkCollision(bullet,this.player)){
      this.player.getHit();
      return true;
    }
    else return false;
  },
  checkBulletEnemies(bullet){
    var control = this.enemies.length;
    if (this.enemies.length === 0) return false;
    else {
      this.enemies = this.enemies.filter(enemie => {
        if (!this.checkCollision(bullet, enemie)) return enemie;
        if (this.checkCollision(bullet,enemie)) {
          enemie.getHit();
          if (enemie.resistance >0) return enemie;
        }
      });
    }
    if (this.enemies.length < control) return true;
  },
  gameOver(){
    clearInterval(this.intervalId);
  },
  clearLevel(){
    this.level++;
    clearInterval(this.intervalId);
    //this.start();
  },
  generateDiagonalObstacles(number,x,y){
    for (var i = 0; i<number;i++){
      this.obstacles.push(new Obstacle(this.ctx, x+(50*i), y+(50*i)));
    }
  },
  generateVerticalObstacles(number,x,y){
    for (var i = 0; i<number;i++){
      this.obstacles.push(new Obstacle(this.ctx, x, y+(50*i)));
    }
  },
  generateHorizontalObstacles(number,x,y){
    for (var i = 0; i<number;i++){
      this.obstacles.push(new Obstacle(this.ctx, x+(50*i), y));
    }
  },
}