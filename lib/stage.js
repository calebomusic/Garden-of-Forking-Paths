import { Engine, World, Composite, Render, Bodies } from 'matter-js/src/module/main.js'

const MOVES = {
  "w": [ 0, -.5],
  "a": [-.5,  0],
  "s": [ 0,  .5],
  "d": [ .5,  0]
};

class Stage {
  constructor(game, ctx, engine) {
    this.game = game;
    this.ctx = ctx;
    this.engine = engine;
  }

  bindKeyHandlers() {
    const player = this.player;
    //
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
