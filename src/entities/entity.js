class Entity {
    constructor() {
    }

    render(ctx, cellSize) {
        ctx.beginPath();
        ctx.arc(this.row * cellSize + cellSize / 2 + 0.5, this.col * cellSize + cellSize / 2 + 0.5, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}

export default Entity;