class Tank {
  constructor(ctx,x,y) {
    this.ctx = ctx,
    this.img = new Image(),
    this.color = 'green',
      this.x = x,
      this.y = y,
      this.sense = 'd',
      this.bullets = [],
      this.maxBullets = 3;
    this.img.src = `./img/${this.color}tank.png`;
    this.lifePoints = 4,
      this.power = 2
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width / 2, this.img.height / 2);
    this.bullets.forEach(bullet => {
      bullet.move();
      bullet.draw();
    });
  }

  shoot() {
    switch (this.sense) {
      case 'u':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 15, this.y - 7));
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
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x - 12, this.y + 16));
        }
        break;
      case 'r':
        if (this.maxBullets > this.bullets.length) {
          this.bullets.push(new Bullet(this.sense, this.ctx, this.x + 38, this.y + 15));
        }
    }
  }
  move(){
    switch (this.sense) {
      case 'u':
        this.img.src = `./img/${this.color}tankup.png`;
        if (this.y === 20)  this.y;
        else this.y -= 5;
        break;
      case 'd':
        this.img.src = `./img/${this.color}tank.png`;
        if (this.y > 600 - this.img.height / 2) this.y - 2;
        else  this.y += 5;
        break;
      case 'l':
        this.img.src = `./img/${this.color}tankleft.png`;
        if (this.x === 180) this.x;
        else this.x -= 5;
        break;
      case 'r':
        this.img.src = `./img/${this.color}tankright.png`;
        if (this.x > 1180 - this.img.width / 2) this.x - 2;
        else this.x += 5;
        break;
      // case 32:
      //   this.shoot();
    }
  }
  moveRandom() {
    var senses = ['u','d','l','r'];
    this.sense = senses[Math.floor(Math.random()*senses.length)];
    switch (this.sense) {
      case 'u':
        this.img.src = `./img/${this.color}tankup.png`;
        break;
      case 'd':
        this.img.src = `./img/${this.color}tank.png`;
        break;
      case 'l':
        this.img.src = `./img/${this.color}tankleft.png`;
        break;
      case 'r':
        this.img.src = `./img/${this.color}tankright.png`;
        break;
    }
  }
}
