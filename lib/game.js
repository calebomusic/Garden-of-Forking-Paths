const Maze = require('./maze');
const Player = require('./player');
const Target = require('./target');

class Game {
  constructor(engine, world) {
    this.engine = engine;
    this.world = world
    this.maze = new Maze(15, 15, engine, world);
    this.maze.growingTree();
    this.player = new Player(engine, world);
    this.target = new Target();
  }

  draw(ctx) {
    this.maze.grid.draw(ctx);
    this.player.draw(ctx);
    this.target.draw(ctx);
  }

  step(timeDelta){
    this.movePlayer(timeDelta);
    this.checkCollisions();
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
