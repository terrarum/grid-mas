import Gameloop from './modules/gameloop';

let update = function update(dt) {
    console.log('h')
};

let render = function render(dt) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
};


let ctx, canvas;

// Get the canvas.
ctx = document.querySelector('.js-canvas').getContext('2d');
canvas = ctx.canvas;

// Set the canvas size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = new Gameloop(update, render);

gl.start();