// Load CSS.
require("./main.css");

// Import modules.
import Gameloop from './modules/gameloop';

// Set canvas and canvas context references.
const ctx = document.querySelector('.js-canvas').getContext('2d'),
    canvas = ctx.canvas;

// Set the canvas size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update function.
let update = function update(dt) {

};

// Render function.
let render = function render(dt) {
    // Clear screen.
    ctx.clearRect(0, 0, canvas.width, canvas.height);


};

// Create new game loop.
const gl = new Gameloop(update, render);

// Start game loop.
gl.start();