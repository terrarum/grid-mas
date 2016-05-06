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
    console.log("Map rendered successfully.", scene);

    // Create entities.
    scene.entities = []; // TODO Probably needs a scene model.
    scene.entities.push(new Rabbit(scene, {x: 20, y: 20}));

    let update = function(dt) {
        scene.entities.forEach((entity) => {
            entity.update(dt);
        });
    };

    let render = function() {
        // Clear scene.
        scene.ctx.clearRect(0, 0, scene.ctx.canvas.clientWidth, scene.ctx.canvas.clientHeight);

        // Render map.
        scene.mapObj.renderMap();

        // Render entities.
        scene.entities.forEach((entity) => {
            entity.render();
        });
    };

    scene.gameloop = new GameLoop(update, render);
    scene.gameloop.start();
});
