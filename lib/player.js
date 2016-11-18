import { Engine, World, Composite, Render, Bodies, Body } from 'matter-js/src/module/main.js'

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Player {
  constructor(engine, world) {
    this.color = randomColor();
    // this.pos = [15, 50];
    // this.vel = [0, 0];
    // this.radius = 7;

    setInterval(() => this.color = randomColor(), 5000);

    // this.circle = Bodies.circle(35, 100 , 7, {frictionAir: 0})
    this.circle = Bodies.circle(520, 540 , 7, {frictionAir: 0})

    World.add(engine.world, this.circle)
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
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
      Body.setVelocity(this.circle, { x: impulse[0], y: impulse[1] });
      // this.circle.angle = impulse[1];
      // this.circle.angularSpeed = impulse[1];
      // this.circle.speed = impulse[0];
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.circle.velocity.x * velocityScale,
    offsetY = this.circle.velocity.y * velocityScale;

    const newPos = [ this.circle.position.x + offsetX,
                    this.circle.position.y + offsetY]

    Body.setPosition( this.circle, { x: newPos[0], y: newPos[1] })
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

    const collision = Util.checkCollisionWithLineIntercepts(
      this, wall.startPos, wall.endPos
    );

    if (collision) {
      this.collided = true;
      // this.handleCollision();
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
