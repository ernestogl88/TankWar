class Tank {
  constructor(ctx, x, y) {
    this.ctx = ctx,
      this.img = new Image(),
      this.color = 'green',
      this.x = x,
      this.y = y,
      this.sense = 'd',
      this.bullets = [],
      this.maxBullets = 3;
    this.img.src = `./img/${this.color}tank.png`;
    this.lifePoints = 2,
      this.power = 1
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width / 2, this.img.height / 2);
    if (this.bullets.length != 0) {
      this.bullets.forEach(bullet => {
        bullet.move();
        bullet.draw();
      });
    }
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
  move() {
    switch (this.sense) {
      case 'u':
        if (this.y < 25) {
          this.y - 2;
          this.moveRandom(['l', 'r']);
        }
        else this.y -= 2;
        break;
      case 'd':
        if (this.y > 595 - this.img.height / 2) {
          this.y - 2;
          this.moveRandom(['l', 'r']);
        }
        else this.y += 2;
        break;
      case 'l':
        if (this.x < 105) {
          this.x;
          this.moveRandom(['u', 'd']);
        }
        else this.x -= 2;
        break;
      case 'r':
        if (this.x > 1100 - this.img.width / 2) {
          this.x - 2;
          this.moveRandom(['u', 'd']);
        }
        else this.x += 2;
        break;
    }
  }
  moveRandom(senses) {
    this.sense = senses[Math.floor(Math.random() * senses.length)];
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
  getHit() {
    this.lifePoints--;
  }
}
