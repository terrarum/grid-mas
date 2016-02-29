// Load CSS.
require("./main.css");

// Import modules.
import Gameloop from './modules/gameloop';
import Grid from './modules/grid';
import Rabbit from './entities/rabbit';

// Wait for DOM ready.
document.addEventListener("DOMContentLoaded", function(event) {
    // Set canvas and canvas context references.
    const ctx = document.querySelector('.js-canvas').getContext('2d');

    // Set the canvas size.
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Create new grid.
    const grid = new Grid(ctx);

    let rabbit = new Rabbit(10, 10);

    // Update function.
    let update = function update(dt) {
        rabbit.update(dt);
    };

    // Render function.
    let render = function render(dt) {
        // Clear screen.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Render grid.
        grid.render();

        // Render entities.
        rabbit.render();
    };

    // Create new game loop.
    const gl = new Gameloop(update, render);

    // Start game loop.
    gl.start();
});