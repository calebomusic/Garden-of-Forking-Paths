import { Engine, World, Composite, Render, Bodies, Body } from 'matter-js/src/module/main.js'

const Maze = require('./maze');
const Player = require('./player');
const Target = require('./target');

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

  draw(ctx) {
    this.maze.grid.draw(ctx);
    this.player.draw(ctx);
    this.target.draw(ctx);
  }

  step(timeDelta){
    if (this.checkTarget()) {
      this.engine.world.gravity.y = 1;
      setTimeout(() => this.fallingFinish(), 1000)
    }
    this.movePlayer(timeDelta);
    this.checkCollisions();
  }

  checkTarget() {
    return this.player.circle.position.x > 515 && this.player.circle.position.x < 533
                                               && this.player.circle.position.y < 580
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

  checkCollisions() {
    const walls = this.maze.grid.walls.reduce( (a, b) => a.concat(b))

    for (var i = 0; i < walls.length; i++) {
      if (this.player.checkCollision(walls[i])) {
        return;
      }
    }
  }
}

module.exports = Game;
