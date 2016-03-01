const State = {
    IDLE: 0,
    MOVING: 1
};

class Entity {
    constructor() {
        this.cellSize = window.grid.cellSize;
        this.acc = 0;
        this.entityState = State.IDLE
    }

    get state() {
        return this.entityState;
    }

    set state(state) {
        this.entityState  = state;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.col * this.cellSize + this.cellSize / 2 + 0.5, this.row * this.cellSize + this.cellSize / 2 + 0.5, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}

export default Entity;