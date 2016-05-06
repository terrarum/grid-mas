const State = {
    IDLE: 0,
    MOVING: 1
};

class Entity {
    constructor(scene) {
        this.scene = scene;
        this.cellSize = scene.map.tilewidth;
        this.acc = 0;
        this.entityState = State.IDLE;
    }

    get state() {
        return this.entityState;
    }

    set state(state) {
        this.entityState = state;
    }

    render() {
        this.scene.ctx.beginPath();
        this.scene.ctx.arc(this.col * this.cellSize + this.cellSize / 2 + 0.5, this.row * this.cellSize + this.cellSize / 2 + 0.5, this.size, 0, 2 * Math.PI, false);
        this.scene.ctx.fillStyle = this.fillStyle;
        this.scene.ctx.fill();
    }
}

export default Entity;