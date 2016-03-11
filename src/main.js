// Load CSS.
require("./main.css");

// Import modules.
import GameLoop from './modules/gameloop';
import Grid from './modules/grid';
import Rabbit from './entities/rabbit';

const scene = {
    ctx: null,
    grid: null
};

// Wait for DOM ready.
document.addEventListener("DOMContentLoaded", function(event) {
    // Set canvas and canvas context references.
    scene.ctx = document.querySelector('.js-canvas').getContext('2d');

    // Set the canvas size.
    scene.ctx.canvas.width = window.innerWidth;
    scene.ctx.canvas.height = window.innerHeight;

    // Create new grid.
    scene.grid = new Grid(scene);

    let rabbit = new Rabbit(scene);
    rabbit.setPosition(5, 5);

    // Update function.
    let update = function update(dt) {
        rabbit.update(dt);
    };

    // Render function.
    let render = function render(dt) {
        // Clear screen.
        scene.ctx.clearRect(0, 0, scene.ctx.canvas.width, scene.ctx.canvas.height);

        // Render grid.
        scene.grid.render();

        // Render entities.
        rabbit.render();
    };

    // Create new game loop.
    const gl = new GameLoop(update, render);

    // Start game loop.
    gl.start();
});