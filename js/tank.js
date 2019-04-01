class Tank {
  constructor(ctx) {
    this.ctx = ctx,
    this.img = new Image(),
    this.img.src = './img/redtank.png',
    this.x = 1130,
    this.y = 25,
    this.sense = 'd',
    this.setListeners(),
    this.bullets = [],
    this.maxBullets = 5
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width/2, this.img.height/2);
    this.bullets.forEach(bullet=>{
      bullet.move();
      bullet.draw();
    });
  }
  setListeners() {
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 38:
          this.img.src = './img/redtankup.png';
          if (this.y === 20) this.y;
          else {
            this.sense = 'u';
            this.y -= 5;
          }
          break;
        case 40:
          this.img.src = './img/redtank.png';
          if (this.y > 600 - this.img.height / 2) this.y - 2;
          else {
            this.sense = 'd';
            this.y += 5;
          }
          break;
        case 37:
          this.img.src = './img/redtankleft.png';
          if (this.x === 180) this.x;
          else {
            this.sense = 'l';
            this.x -= 5;
          }
          break;
        case 39:
          this.img.src = './img/redtankright.png';
          if (this.x > 1180 - this.img.width / 2) this.x - 2;
          else {
            this.sense = 'r';
            this.x += 5;
          }
          break;
        case 32:
          this.shoot();
      }
    }.bind(this);
  }
  shoot() {
    switch (this.sense) {
      case 'u':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 16, this.y));
        }
        //this.bullets[this.bullets.length-1].drawShoot();
        break;
      case 'd':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 16, this.y + 34));
        }
        //this.bullets[this.bullets.length-1].drawShoot();
        break;
      case 'l':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x, this.y + 17));
        }
        break;
      case 'r':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 17, this.y + 32));
        }
    }

  }
}
