var Game = {
  canvas : undefined,
  ctx : undefined,
  player: undefined,
  fps : 60,
  enemies : [],
  obstacles: [],
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
      this.clear();
      this.background.draw();
      this.player.draw();
      this.player.bullets = this.player.bullets.filter(bullet=>{
        console.log(`${bullet.x}, ${bullet.y}`)
        bullet.y < 600-bullet.img.height/2 &&
        bullet.y > 20 &&
        bullet.x < 1180 - bullet.img.width/2 &&
        bullet.x > 180
      });
    }, 1000/this.fps);
    
  },
  setCanvasDimension(){
    // this.canvas.setAttribute("height", window.innerHeight);
    // this.canvas.setAttribute("width", window.innerWidth);
  },
  reset(){
    this.background = new Background(this.ctx);
    this.player = new Tank(this.ctx);
    this.enemies = [];
    this.obstacles = [];
  },
  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}