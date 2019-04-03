class Background {
  constructor(ctx){
    this.ctx = ctx,
    this.img = new Image(),
    this.img.src = './img/bigbg.png';
  }
  draw(){
    this.ctx.drawImage(this.img,100,20,this.img.width,580);
  }
}