class Bullet {
  constructor(sense,ctx,x,y){
    this.sense = sense,
    this.x = x,
    this.y = y,
    this.ctx = ctx,
    this.img = new Image();
    this.img.src = './img/bulletdown.png';
  }
  draw(){
    this.ctx.drawImage(this.img,this.x,this.y,this.img.width/2,this.img.height/2);
  }
  move(){
    switch (this.sense) {
      case 'u':
        this.y -= 7;
        this.img.src = './img/bullet.png';
        break;
      case 'd':
        this.y += 7;
        this.img.src = './img/bulletdown.png';
        break;
      case 'l':
        this.x -= 7;
        this.img.src = './img/bulletleft.png';
        break;
      case 'r':
        this.x += 7;
        this.img.src = './img/bulletright.png';
    }
  }
  drawShoot(){
    var img = new Image();
    img.src = './img/shot.png';
    this.ctx.drawImage(img,this.x+this.img.width/4,this.y, img.width/2,img.height/2);
    img.src = './img/shot2.png';
    this.ctx.drawImage(img,this.x+this.img.width/4,this.y, img.width/2,img.height/2);
  }
}