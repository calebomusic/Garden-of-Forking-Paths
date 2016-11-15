const Grid = require('./grid');
// const Maze = require('/.maze');

class Game {
  constructor(player) {
    this.grid = new Grid(20,20);
    this.player = player;
  }
}
