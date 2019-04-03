class Obstacle {
  constructor(ctx,x,y){
    this.x = x,
    this.y = y,
    this.ctx = ctx,
    this.img = new Image();
    this.img.src = './img/obstacle.png',
    this.resistance = 3
  }
  draw(){
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width/2,this.img.height/2);
  }
  getHit(){
    this.resistance --;
    if (this.resistance === 2) this.img.src='./img/explosion1.png';
    if (this.resistance === 1) this.img.src='./img/explosion2.png';
  }
}