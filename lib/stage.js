const MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0]
};

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
    this.lastTime = time;
    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = Stage;
