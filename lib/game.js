const Maze = require('./maze');
const Player = require('./player');

class Game {
  constructor() {
    this.maze = new Maze(25, 25);
    this.maze.growingTree();
    this.player = new Player();
  }

  draw(ctx) {
    this.maze.grid.draw(ctx);
    this.player.draw(ctx);
  }

  step(timeDelta){
    this.movePlayer(timeDelta);
  }

  movePlayer(delta) {
    this.player.move(delta);
  }
}

module.exports = Game;
