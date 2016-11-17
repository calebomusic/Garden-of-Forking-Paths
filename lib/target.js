
class Target {
  constructor() {
    this.pos = [623, 657];
    this.radius = 8;

  }

  draw(ctx) {
    ctx.fillStyle = '#ff0000';

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 9, 0, 2 * Math.PI, true
    );
    
    ctx.fill();
  }
}

module.exports = Target;
