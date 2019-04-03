class Cross {
  constructor(x,y,ctx){
    this.img = new Image();
    this.img.src = './img/cross.png'
    this.x = x,
    this.y = y,
    this.ctx = ctx
  }
  draw(){
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width/1.2,this.img.height/1.2);
  }
}