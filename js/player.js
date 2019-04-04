class Player extends Tank {
  constructor(ctx, x, y) {
    super(ctx, x, y);
    this.setListeners();
    this.color = 'red',
      this.img.src = `./img/${this.color}tank.png`;
    this.lifePoints = 5
    }
  setListeners() {
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 38:
          this.img.src = `./img/${this.color}tankup.png`;
          if (this.y < 25) {
            this.sense = 'u';
            this.y - 2;
          }
          else {
            this.sense = 'u';
            this.y -= 5;
          }
          break;
        case 40:
          this.img.src = `./img/${this.color}tank.png`;
          if (this.y > 595 - this.img.height / 2) {
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
          if (this.x < 105) {
            this.sense = 'l';
            this.x + 2;
          }
          else {
            this.sense = 'l';
            this.x -= 5;
          }
          break;
        case 39:
          this.img.src = `./img/${this.color}tankright.png`;
          if (this.x > 1100 - this.img.width / 2) {
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
  checkPlayerCollisions(obstacles, enemies) {
    obstacles.forEach(obstacle => {
      if (this.checkCollision(this, obstacle)) {
        switch (this.sense) {
          case 'u':
            this.y = obstacle.y + obstacle.img.height / 2;
            break;
          case 'd':
            this.y = obstacle.y - this.img.height / 2;
            break;
          case 'l':
            this.x = obstacle.x + obstacle.img.width / 2;
            break;
          case 'r':
            this.x = obstacle.x - this.img.width / 2;
            break;
        }
      }
    });
    enemies.forEach(enemie => {
      if (this.checkCollision(this, enemie)) {
        switch (this.sense) {
          case 'u':
            this.y = enemie.y + enemie.img.height / 2;
            enemie.moveRandom(['l,r']);
            enemie.move();
            break;
          case 'd':
            this.y = enemie.y - this.img.height / 2;
            enemie.moveRandom(['l,r']);
            enemie.move();
            break;
          case 'l':
            this.x = enemie.x + enemie.img.width / 2;
            enemie.moveRandom(['d,u']);
            enemie.move();
            break;
          case 'r':
            this.x = enemie.x - this.img.width / 2;
            enemie.moveRandom(['d,u']);
            enemie.move();
            break;
        }
      }
    });
  }
}