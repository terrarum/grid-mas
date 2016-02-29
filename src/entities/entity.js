class Entity {
    constructor() {
        this.cellSize = window.grid.cellSize;
        this.acc = 0;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.row * this.cellSize + this.cellSize / 2 + 0.5, this.col * this.cellSize + this.cellSize / 2 + 0.5, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}

export default Entity;