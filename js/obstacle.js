class Obstacle {
  constructor(ctx,x,y){
    this.x = x,
    this.y = y,
    this.ctx = ctx,
    this.img = new Image();
    this.img.src = './img/obstacle.png',
    this.resistance = 2
  }
  draw(){
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width/2,this.img.height/2);
  }
}