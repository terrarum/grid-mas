class Grid {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        this.cellSize = 20; // Pixels.
        this.colCount = this.canvas.width / this.cellSize;
        this.rowCount = this.canvas.height / this.cellSize;
    }

    render() {
        this.ctx.strokeStyle = '#aaaaaa';
        this.ctx.beginPath();

        // Draw rows.
        for (let i = 0; i < this.rowCount; i++) {
            this.ctx.moveTo(0, this.cellSize * i + 0.5);
            this.ctx.lineTo(this.ctx.canvas.width, this.cellSize * i + 0.5);
        }

        // Draw columns.
        for (let i = 0; i < this.colCount; i++) {
            this.ctx.moveTo(this.cellSize * i + 0.5, 0);
            this.ctx.lineTo(this.cellSize * i + 0.5, this.ctx.canvas.height );
        }

        // Draw!
        this.ctx.stroke();
    }
}

export default Grid;