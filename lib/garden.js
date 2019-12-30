import { Engine, World, Render } from 'matter-js/src/module/main.js'

const Game = require("./game");
const Stage = require("./stage");

document.addEventListener("DOMContentLoaded", function() {
  let game;
  // Prepare canvas
  const canvasEl = document.getElementsByTagName("canvas")[0]
  canvasEl.width = 800;
  canvasEl.height = 600;
  const ctx = canvasEl.getContext("2d");


  // Create world
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

  // Entrance effects
  let entranceExplosion, entranceOpenModal;
  const generateExplodeAndOpenModalOnEntrance = (engine, world )=> {
    game = null;
    let game = generateGarden(engine, world);
    entranceExplosion = window.setTimeout(game.fallingFinish, 2000);
    entranceOpenModal = window.setTimeout(() => {
        modal.style.display = 'block'
      }, 5000);

    $('body').one('click', () => generateGarden(engine, world));
  }

  // Generate Garden
  const generateGarden = (engine, world) => {
    window.clearTimeout(entranceExplosion);
    window.clearTimeout(entranceOpenModal);
    Engine.clear(engine);
    World.clear(engine.world);
    ctx.clearRect(0, 0, 800, 600);

    engine.world.gravity.y = 0;

    const stage = document.getElementById('stage');

    const game = new Game(engine, world);
    new Stage(game, ctx, engine).start();

    return game;
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

    // Execute entrance effects
    generateExplodeAndOpenModalOnEntrance(engine, world);
})
