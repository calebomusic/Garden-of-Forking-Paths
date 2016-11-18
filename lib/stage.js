import { Engine, World, Composite, Render, Bodies } from 'matter-js/src/module/main.js'

const MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0]
};

// angle, velocity

// const MOVES = {
//   "w": [ 0.1, 0],
//    "a": [0.1,  .5],
//    "s": [ 0.1, -.5 ],
//    "d": [ 0.1,  -1]
// }

class Stage {
  constructor(game, ctx, engine) {
    this.game = game;
    this.player = this.game.player;
    this.ctx = ctx;
    this.engine = engine;
  }

  bindKeyHandlers() {
    const player = this.player;

    Object.keys(MOVES).forEach((k) => {
      let move = MOVES[k];

      key(k, () => { player.power(move); });
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.draw();
    this.lastTime = time;
    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    // this.ctx.clearRect(0, 0, 1500, 1500);
    // this.game.draw(this.ctx);
  }
}

module.exports = Stage;
