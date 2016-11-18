import { Engine, World, Render } from 'matter-js/src/module/main.js'

const Game = require("./game");
const Stage = require("./stage");

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 546;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");

  // Generate Garden
  const generateGarden = () => {
    const engine = Engine.create();
    const world = World.create();

    engine.world.gravity.y = 0;

    const stage = document.getElementById('stage');

    const render = Render.create({
      element: stage,
      canvas: canvasEl,
      engine: engine,
      options: {
        width: 546,
        wireframes: false,
        background: ''
      }
    });

    Render.run(render);

    const game = new Game(engine, world);
    new Stage(game, ctx, engine).start();

    Engine.run(engine);
  }

  // Modal and Buttons
    const generateButton = document.getElementById('generate')
    const aboutButton = document.getElementById('about');
    const modal = document.getElementsByClassName('modal')[0];
    const closeModal = document.getElementById('close');

    generateButton.onclick = () => generateGarden();

    window.onclick = (e) => {
      if (e.target == modal) {
        modal.style.display = 'none'
      }
    }

    closeModal.onclick = () => modal.style.display = 'none';
    aboutButton.onclick = () => modal.style.display = 'block';
})
