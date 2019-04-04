var Game = {
  canvas: undefined,
  ctx: undefined,
  player: undefined,
  fps: 60,
  enemies: [],
  obstacles: [],
  counter: 0,
  level: 0,
  kills:0,
  sound: new Audio('./sounds/Party-blower.mp3'),
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
      this.scoreBoard.draw(this.player.lifePoints, this.kills);
      this.player.draw();
      if (this.player.bullets.length != 0) {
        this.player.bullets = this.clearBullets(this.player.bullets);
        this.player.bullets = this.player.bullets.filter(bullet => {
        if (!this.checkBulletObstacle(bullet) &&
            !this.checkBulletEnemies(bullet)) return bullet;
        });
      }
      this.player.checkPlayerCollisions(this.obstacles,this.enemies);
      if (this.checkCollision(this.player,this.goal)){
        this.level===1 ? this.win() :this.clearLevel();
      }
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
      for (var i = 0 ; i < 3 ; i++){
        this.enemies.push(new Tank(this.ctx, 170+ (250*i), 550 ))
      }
      for (var i = 0 ; i < 3 ; i++){
        this.enemies.push(new Tank(this.ctx, 170+ (250*i), 25 ))
      }
      for (var i =0;i<6;i++){
        this.generateDottedObstacles(4,170+(150*i),90);
      }
      this.generateDottedObstacles(4,170,90);
      this.goal = new Cross(105, 540, this.ctx);
      this.scoreBoard = new Scoreboard(1150, 25, this.ctx);
    }
    if (this.level === 1){
      this.kills=0;
      this.obstacles = []
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx, 1050, 25);
      for (var i = 0 ; i < 3 ; i++){
        this.enemies.push(new Tank(this.ctx, 170+ (250*i), 550 ))
      }
      for (var i = 0 ; i < 3 ; i++){
        this.enemies.push(new Tank(this.ctx, 170+ (250*i), 25 ))
      }
      for (var i = 0 ; i < 3 ; i++){
        this.enemies.push(new Tank(this.ctx, 170+ (250*i), 300 ))
      }
      for (var i =0;i<4;i++){
        this.generateHorizontalObstacles(12,170,80+(130*i));
      }
      this.goal = new Cross(370, 285, this.ctx);
      this.scoreBoard = new Scoreboard(1150, 25, this.ctx);
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
    if (this.obstacles.length < control) {
      this.obstaclesCleared += control - this.obstacles.length;
      return true;
    }
  },
  checkBulletPlayer(bullet){
    if (this.checkCollision(bullet,this.player)){
      this.player.getHit();
      if (this.player.lifePoints <=0) this.gameOver();
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
    if (this.enemies.length < control) {
      this.kills += control - this.enemies.length;
      return true;}
  },
  gameOver(){
    clearInterval(this.intervalId);
    document.querySelector('#levelCleared').style.display = 'none'
    document.querySelector('#redArrow').style.display = 'none'
    document.querySelector('#modal').style.display ='flex';
  },
  clearLevel(){
    clearInterval(this.intervalId);
    document.querySelector('#gameOver').style.display = 'none';
    document.querySelector('#redArrow').style.display = 'block'
    document.querySelector('#modal').style.display ='flex';
  },
  generateDottedObstacles(number,x,y){
    for (var i = 0; i<number;i++){
      this.obstacles.push(new Obstacle(this.ctx, x, y+(110*i)));
    }
  },
  generateHorizontalObstacles(number,x,y){
    for (var i = 0; i<number;i++){
      this.obstacles.push(new Obstacle(this.ctx, x+(70*i), y));
    }
  },
  win(){
    clearInterval(this.intervalId);
    document.querySelector('#gameOver').style.display = 'none';
    document.querySelector('#redArrow').style.display = 'none';
    document.querySelector('#modal').style.display ='flex';
    this.sound.play();
    var myConfetti = confetti.create(this.canvas);
    myConfetti({
      particleCount: 400,
      spread: 160
    });
  }
}