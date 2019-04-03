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
}