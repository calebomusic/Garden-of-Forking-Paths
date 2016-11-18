import { Engine, World, Render } from 'matter-js/src/module/main.js'

const Game = require("./game");
const Stage = require("./stage");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 800;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");

  const engine = Engine.create();
  const world = World.create();
  const render = Render.create({
    element: stage,
    canvas: canvasEl,
    engine: engine,
    options: {
      width: 900,
      wireframes: false,
      background: ''
    }
  });

  Render.run(render);
  Engine.run(engine);


  // Generate Garden
  const generateGarden = (engine, world) => {
    Engine.clear(engine);
    World.clear(engine.world);
    ctx.clearRect(0, 0, 800, 600);

    engine.world.gravity.y = 0;

    const stage = document.getElementById('stage');

    const game = new Game(engine, world);
    new Stage(game, ctx, engine).start();
  }

  // Modal and Buttons
    const generateButton = document.getElementById('generate')
    const aboutButton = document.getElementById('about');
    const modal = document.getElementsByClassName('modal')[0];
    const closeModal = document.getElementById('close');

    generateButton.onclick = () => generateGarden(engine, world);

    window.onclick = (e) => {
      if (e.target == modal) {
        modal.style.display = 'none'
      }
    }

    closeModal.onclick = () => modal.style.display = 'none';
    aboutButton.onclick = () => modal.style.display = 'block';
})
