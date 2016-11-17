const Game = require("./game");
const Stage = require("./stage");

// TODO: for testing
const Grid = require("./grid");
const Wall = require("./wall");
const Maze = require("./maze")

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 900;
  canvasEl.height = 950;

  const ctx = canvasEl.getContext("2d")
  const game = new Game();
  new Stage(game, ctx).start();

  //TODO: for testing
  // let m = new Maze(25, 25);
  // m.growingTree();
  // m.grid.draw(ctx);
  // window.g = g;
})

window.grid = Grid;
