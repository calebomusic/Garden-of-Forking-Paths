class Player {
  constructor() {
    this.color = '#74e43c';
    this.pos = [0,0];
    this.vel = [0, 0];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 7.5, 0, 2 * Math.PI, true
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

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    // if (this.game.isOutOfBounds(this.pos)) {
    //   this.vel = [0, 0]
    // }
  }

  isOutOfBounds() {

  }
}

module.exports = Player;

const NORMAL_FRAME_TIME_DELTA = 1000/60;
