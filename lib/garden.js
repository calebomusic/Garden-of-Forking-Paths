import { Engine, World, Composite, Render, Bodies } from 'matter-js/src/module/main.js'

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

  const engine = Engine.create();
  const world = World.create();

  engine.world.gravity.y = 0;

  const stage = document.getElementById('stage');

  const render = Render.create({
    element: stage,
    canvas: canvasEl,
    engine: engine,
    options: {
      wireframes: false      
    }
  });

  Render.run(render);

  // // TODO: testing
  // var boxA = Bodies.rectangle(400, 200, 80, 80);
  // var boxB = Bodies.rectangle(450, 50, 80, 80);
  // var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  //
  // World.add(engine.world, [boxA, boxB, ground]);

  const game = new Game(engine, world);
  new Stage(game, ctx, engine).start();

  Engine.run(engine);

  //TODO: for testing
})

window.grid = Grid;
