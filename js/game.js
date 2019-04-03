var Game = {
  canvas: undefined,
  ctx: undefined,
  player: undefined,
  fps: 60,
  enemies: [],
  obstacles: [],
  counter: 0,
  level: 1,
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
      this.checkPlayerCollisions(this.player);
      this.enemies.forEach(tank => {
        this.checkEnemiesCollisions(tank);
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
      this.goal = new Cross(105, 540, this.ctx);
      this.scoreBoard = new Scoreboard(1100, 25, this.ctx);
    }


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
  checkCollision(object1, object2,gap=0) {
    if (object2.x-gap < object1.x + object1.img.width / 2 &&
      object1.x < object2.x-gap + object2.img.width / 2-gap &&
      object2.y+gap*4 < object1.y + object1.img.height / 2 &&
      object1.y < object2.y+gap*4 + object2.img.height / 2+gap*4) return true;
    else return false;
  },
  checkPlayerCollisions(player) {
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
    this.enemies.forEach(enemie => {
      if (this.checkCollision(player, enemie)) {
        switch (player.sense) {
          case 'u':
            player.y = enemie.y + enemie.img.height / 2;
            enemie.moveRandom(['l,r']);
            enemie.move();
            break;
          case 'd':
            player.y = enemie.y - player.img.height / 2;
            enemie.moveRandom(['l,r']);
            enemie.move();
            break;
          case 'l':
            player.x = enemie.x + enemie.img.width / 2;
            enemie.moveRandom(['d,u']);
            enemie.move();
            break;
          case 'r':
            player.x = enemie.x - player.img.width / 2;
            enemie.moveRandom(['d,u']);
            enemie.move();
            break;
        }
      }
    });
    if (this.checkCollision(player,this.goal,8)){
      this.clearLevel();
    }
  },
  checkEnemiesCollisions(tank) {
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
      var tempEnemies = this.enemies.filter(enemie=>{
        if(enemie != tank) return enemie;
      });
      tempEnemies.forEach(enemie => {
        if (this.checkCollision(tank, enemie)) {
          switch (tank.sense) {
            case 'u':
              //tank.y = enemie.y + enemie.img.height / 2;
              tank.moveRandom(['l', 'r']);
              break;
            case 'd':
              //tank.y = enemie.y - tank.img.height / 2;
              tank.moveRandom(['l', 'r']);
              break;
            case 'l':
              //tank.x = enemie.x + enemie.img.width / 2;
              tank.moveRandom(['u', 'd']);
              break;
            case 'r':
              //tank.x = enemie.x - tank.img.width / 2;
              tank.moveRandom(['u', 'd']);
              break;
          }
        }
      });
      if (this.checkCollision(tank, this.player)) {
        switch (tank.sense) {
          case 'u':
            //tank.y = enemie.y + enemie.img.height / 2;
            tank.moveRandom(['l', 'r']);
            break;
          case 'd':
            //tank.y = enemie.y - tank.img.height / 2;
            tank.moveRandom(['l', 'r']);
            break;
          case 'l':
            //tank.x = enemie.x + enemie.img.width / 2;
            tank.moveRandom(['u', 'd']);
            break;
          case 'r':
            //tank.x = enemie.x - tank.img.width / 2;
            tank.moveRandom(['u', 'd']);
            break;
        }
      }
  },

checkBulletObstacle(bullet) {
    var control = this.obstacles.length;
    if (this.obstacles.length === 0) return false;
    else {
      this.obstacles = this.obstacles.filter(obstacle => {
        if (!this.checkCollision(bullet, obstacle)) return obstacle;
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