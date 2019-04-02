var Game = {
  canvas : undefined,
  ctx : undefined,
  player: undefined,
  fps : 60,
  enemies : [],
  obstacles: [],
  counter : 0,
  init(canvasId){
    this.canvas = document.querySelector(canvasId);
    this.canvas.setAttribute("height", window.innerHeight);
    this.canvas.setAttribute("width", window.innerWidth);
    this.ctx = this.canvas.getContext('2d');
    this.start();
  },

  start(){
    this.reset();
    this.intervalId = setInterval(() => {
      this.counter++;
      this.clear();
      this.background.draw();
      this.player.draw();
      this.player.bullets = this.player.bullets.filter(bullet=>{
        return bullet.y < 600-bullet.img.height/2 &&
        bullet.y > 20 &&
        bullet.x < 1180 - bullet.img.width/2 &&
        bullet.x > 180;
      });
      this.enemies.forEach(tank => {
      
        tank.draw();
        tank.move();
        if (this.counter % 60==0){
          tank.shoot();
          tank.moveRandom();
        }
        tank.bullets = tank.bullets.filter(bullet=>{
          return bullet.y < 600-bullet.img.height/2 &&
          bullet.y > 20 &&
          bullet.x < 1180 - bullet.img.width/2 &&
          bullet.x > 180;
        });
      });
      this.obstacles.forEach(obstacle=>obstacle.draw());
    }, 1000/this.fps);
    
  },
  setCanvasDimension(){
    // this.canvas.setAttribute("height", window.outerHeight);
    // this.canvas.setAttribute("width", window.innerWidth);
  },
  reset(){
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx,1130,25);
    this.enemies = [new Tank(this.ctx,185,25),new Tank(this.ctx,185,80),new Tank(this.ctx,185,150)];
    this.obstacles = [new Obstacle(this.ctx,250,40),new Obstacle(this.ctx,300,40),new Obstacle(this.ctx,350,40)];
  },
  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}