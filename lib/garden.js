const Game = require("./game");
const Stage = require("./stage");

// TODO: for testing
const Grid = require("./grid");
const Wall = require("./wall");
const Maze = require("./maze")

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 1500;
  canvasEl.height = 1500;

  const ctx = canvasEl.getContext("2d")
  // const game = new Game();
  // new Stage(game, ctx).start();

  //TODO: for testing
  let g = new Grid(25, 25);
  let m = new Maze(g);
  m.growingTree();
  g.draw(ctx);
  window.g = g;
})

window.grid = Grid;
