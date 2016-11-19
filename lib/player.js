import { World, Bodies, Body } from 'matter-js/src/module/main.js'

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
    randomColor();
    this.circle = Bodies.circle(195, 50 , 7, { frictionAir: 0,
        render: {
         fillStyle: randomColor(),
         strokeStyle: randomColor(),
         lineWidth: 2
        },
        mass: 17
       }
     )

    World.add(engine.world, this.circle)
  }
  
  power(impulse) {
    Body.setVelocity(this.circle, { x: impulse[0], y: impulse[1] });
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.circle.velocity.x * velocityScale,
    offsetY = this.circle.velocity.y * velocityScale;

    const newPos = [ this.circle.position.x + offsetX,
                    this.circle.position.y + offsetY]

    Body.setPosition( this.circle, { x: newPos[0], y: newPos[1] })
  }
}

module.exports = Player;

const NORMAL_FRAME_TIME_DELTA = 1000/60;
