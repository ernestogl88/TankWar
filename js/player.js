class Player extends Tank {
  constructor(ctx, x, y) {
    super(ctx, x, y);
    this.setListeners();
    this.color = 'red',
    this.img.src = `./img/${this.color}tank.png`;
    this.lifePoints = 4,
    this.power = 2 
  }
  setListeners() {
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 38:
          this.img.src = `./img/${this.color}tankup.png`;
          if (this.y < 25) {
            this.sense = 'u';
            this.y-2;
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
          if (this.x < 185) {
            this.sense = 'l';
            this.x+2;
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