class Scoreboard {
  constructor(x,y,ctx){
    this.img = new Image();
    this.img.src = './img/heart.png',
    this.img2= new Image(),
    this.img2.src= './img/brokenheart.png';
    this.x = x,
    this.y = y,
    this.ctx = ctx;
  }
  draw(lifePoints){
    var gap;
    for (var i = 0;i <lifePoints;i++){
      gap = i*25+25;
      this.ctx.drawImage(this.img,this.x+(25*i),this.y,this.img.width,this.img.height);
    }
      for (var i =0 ; i<2-lifePoints;i++){
        this.ctx.drawImage(this.img2,this.x+(gap+25*i),this.y,this.img.width,this.img.height);
      }
    
    
  }
}