class Cross {
  constructor(x,y,ctx){
    this.img = new Image();
    this.img.src = './img/'
    this.x = x,
    this.y = y,
    this.ctx = ctx
  }
  draw(){
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width/2,this.img.height/2);
  }
}