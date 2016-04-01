import { timestamp } from '../utils.js';

class Gameloop {

    constructor(update, render) {
        this.now;
        this.last = timestamp();
        this.dt = 0;
        this.slow = 1;
        this.step = 1 / 60;
        this.slowStep = this.slow * this.step;
        this.update = update;
        this.render = render;
    }

    frame() {
        this.now = timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
        while (this.dt > this.slowStep) {
            this.dt = this.dt - this.slowStep;
            this.update(this.step);
        }
        this.render(this.dt / this.slow);
        this.last = this.now;

        requestAnimationFrame(() => {
            this.frame()
        });
    }

    start() {
        // Start the game loop.
        requestAnimationFrame(() => {
            this.frame()
        });
    }
}

export default Gameloop;