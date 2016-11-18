import { World, Body, Bodies } from 'matter-js/src/module/main.js'

const Maze = require('./maze');
const Player = require('./player');

class Game {
  constructor(engine, world) {
    this.engine = engine;
    this.world = world
    this.maze = new Maze(17, 17, engine, world);
    this.maze.growingTree();
    this.player = new Player(engine, world);
    this.target = Bodies.rectangle(530, 560, 10, 10);

    World.add(this.engine.world, [this.target])
  }

  build() {
    console.log('building');

    this.engine.world.gravity.y = 0;

    this.engine.world.bodies.forEach( body => (
      Body.setStatic(body, true)
    ))
  }

  step(timeDelta){
    if (this.checkTarget()) {
      this.engine.world.gravity.y = 1;
      setTimeout(() => this.fallingFinish(), 1000)
    }
    this.movePlayer(timeDelta);
  }

  checkTarget() {
    return this.player.circle.position.x > 515
                && this.player.circle.position.x < 550
                && this.player.circle.position.y < 590
                && this.player.circle.position.y > 550
  }

  fallingFinish() {
    this.engine.world.bodies.forEach( body => {
      if (body.mass !== 17) {
        Body.setStatic(body, false);
        body.angle = Math.random();
      }
    })
  }

  movePlayer(delta) {
    this.player.move(delta);
  }
}

module.exports = Game;
