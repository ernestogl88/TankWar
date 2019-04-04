class Background {
  constructor(ctx){
    this.ctx = ctx,
    this.img = new Image(),
    this.img.src = './img/bigbg.png';
    this.img2 = new Image();
    this.img2.src = './img/frame.jpg'
    }
  draw(){
    this.ctx.drawImage(this.img2,0,0,1380 ,650);
    this.ctx.drawImage(this.img,100,20,this.img.width,580);
  }
}