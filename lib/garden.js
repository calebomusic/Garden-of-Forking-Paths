const Game = require("./game");
const Stage = require("./stage");
const Grid = require("./grid");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 1000;
  canvasEl.height = 1000;

  const ctx = canvasEl.getContext("2d")
  // const game = new Game();
  // new Stage(game, ctx).start();
})

window.grid = Grid;
