class Scoreboard {
  constructor(x, y, ctx) {
    this.img = new Image();
    this.img.src = './img/heart.png',
      this.img2 = new Image(),
      this.img2.src = './img/brokenheart.png';
    this.img3 = new Image();
    this.img3.src = './img/board.png';
    this.img4 = new Image();
    this.img4.src = './img/greentank.png';
    this.x = x,
      this.y = y,
      this.ctx = ctx;
  }
  draw(lifePoints, kills) {
    var gap;
    for (var i = 0 ; i<2;i++){
      this.ctx.drawImage(this.img3, this.x, this.y + (i*100), this.img.width*6, this.img.height*2);
    }
    for (var i = 0; i < lifePoints; i++) {
      gap = i * 25 + 25;
      this.ctx.drawImage(this.img, this.x + (25 * i)+30, this.y+20, this.img.width, this.img.height);
    }
    for (var i = 0; i < 5 - lifePoints; i++) {
      this.ctx.drawImage(this.img2, this.x + (gap + 25 * i)+30, this.y+20, this.img.width, this.img.height);
    }

    this.ctx.drawImage(this.img4, this.x +30, this.y+120, this.img.width, this.img.height); 

    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`X ${kills}`, this.x + 80, this.y + 150);

  }
}