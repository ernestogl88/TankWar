class Tank {
  constructor(ctx,type,x,y) {
    this.ctx = ctx,
    this.img = new Image(),
    this.color = 'green',
    this.x = x,
    this.y = y,
    this.sense = 'd',
    this.bullets = [],
    this.maxBullets = 3;
    if (type === 1){
      this.color = 'red';
      this.setListeners();
    };
    this.img.src = `./img/${this.color}tank.png`;
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width/2, this.img.height/2);
    this.bullets.forEach(bullet=>{
      bullet.move();
      bullet.draw();
    });
  }
  setListeners() {
    if (this.type === 1) {
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 38:
            this.img.src = `./img/${this.color}tankup.png`;
            if (this.y === 20) {
              this.sense = 'u';
              this.y;
            }
            else {
              this.sense = 'u';
              this.y -= 5;
            }
            break;
          case 40:
            this.img.src = `./img/${this.color}tank.png`;
            if (this.y > 600 - this.img.height / 2) {
              this.sense = 'd';
              this.y - 2;
            }
            else {
              this.sense = 'd';
              this.y += 5;
            }
            break;
          case 37:
            this.img.src = `./img/${this.color}tankleft.png`;
            if (this.x === 180) {
              this.sense = 'l';
              this.x;
            }
            else {
              this.sense = 'l';
              this.x -= 5;
            }
            break;
          case 39:
            this.img.src = `./img/${this.color}tankright.png`;
            if (this.x > 1180 - this.img.width / 2) {
              this.sense = 'r';
              this.x - 2;
            }
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

  }
  shoot() {
    switch (this.sense) {
      case 'u':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 15, this.y-7));
        }
        //this.bullets[this.bullets.length-1].drawShoot();
        break;
      case 'd':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 15, this.y + 38));
        }
        //this.bullets[this.bullets.length-1].drawShoot();
        break;
      case 'l':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x-12, this.y + 16));
        }
        break;
      case 'r':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x +38 , this.y + 15));
        }
    }
  }
  moveRandom(){
    if (this.type === 0){

    }
  }
}
