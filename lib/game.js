const Maze = require('./maze');
const Player = require('./player');

class Game {
  constructor() {
    this.maze = new Maze(20, 20);
    this.maze.growingTree();
    this.player = new Player();
  }

  draw(ctx) {
    this.maze.grid.draw(ctx);
    this.player.draw(ctx);
  }

  step(timeDelta){
    this.checkCollisions();
    this.movePlayer(timeDelta);
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
