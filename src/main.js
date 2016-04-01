// Load CSS.
require("./main.css");

// Import modules.
import GameLoop from './modules/gameloop';
import Map from './modules/map';

import Rabbit from './entities/rabbit';

const scene = {
    ctx: null,
    map: null
};

// Wait for DOM ready.
document.addEventListener("DOMContentLoaded", function(event) {
    // Set canvas and canvas context references.
    scene.ctx = document.querySelector('.js-canvas').getContext('2d');

    scene.map = new Map(scene);

    scene.map.load('map1');
});

// Map has been loaded and rendered.
document.addEventListener("MAP:RENDERED", function(event) {
    console.log("Map rendered successfully.", scene)

    let rabbit = new Rabbit(scene);
    rabbit.setPosition(2, 3);

    // Create entities.
    scene.entities = [];
    scene.entities.push(rabbit);

    let update = function(dt) {
        scene.entities.forEach((entity) => {
            entity.update(dt);
        });
    };

    let render = function() {
        scene.entities.forEach((entity) => {
            entity.render();
        });
    };

    scene.gameloop = new GameLoop(update, render);
    scene.gameloop.start();
});

// When the map has been loaded, process it.
//document.addEventListener("MAP:LOADED", function(event) {
//    console.log(scene);
//
//    // Update function.
//    let update = function update(dt) {
//        //rabbit.update(dt);
//    };
//
//    // Render function.
//    let render = function render(dt) {
//        // Clear screen.
//        scene.ctx.clearRect(0, 0, scene.ctx.canvas.width, scene.ctx.canvas.height);
//
//        // Render grid.
//        //scene.grid.render();
//
//        // Render entities.
//        //rabbit.render();
//    };
//
//    // Create new game loop.
//    const gl = new GameLoop(update, render);
//
//    // Start game loop.
//    gl.start();
//});