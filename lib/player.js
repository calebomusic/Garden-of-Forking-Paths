const Util = require('./util')
class Player {
  constructor() {
    this.color = '#74e43c';
    this.pos = [25, 25];
    this.vel = [0, 0];
    this.radius = 7
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

    const newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.inBounds(newPos)) {
      this.pos = newPos;
    } else {
      this.vel = [0, 0]
      this.pos = [this.pos[0] - offsetX * 2, this.pos[1] - offsetY * 2];
    }

    // if (this.game.isOutOfBounds(this.pos)) {
    //   this.vel = [0, 0]
    // }
  }

  inBounds(pos) {
    const [x, y] = pos;
    return x >= 4 && x < 650 && y >= 4 && y <= 700;
  }

  isOutOfBounds() {

  }

  checkCollision(wall) {
    const startPointDist = Util.dist(wall.startPos, this.pos);
    const endPointDist = Util.dist(wall.endPos, this.pos);

    if (startPointDist < this.radius || endPointDist < this.radius) {
      this.handleCollision();
      return true;
    } else {
      return false;
    }
  }

  handleCollision() {
    this.vel = [0, 0];
  }
}

module.exports = Player;

const NORMAL_FRAME_TIME_DELTA = 1000/60;
