const Maze = require('./maze');

class Game {
  constructor() {
    this.maze = new Maze(25,25);
    this.maze.growingTree();
  }

  draw(ctx) {
    this.maze.grid.draw(ctx)
  }
}

module.exports = Game;
