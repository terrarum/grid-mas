import GridModel from '../models/gridModel';

class Grid {
    constructor(ctx) {
        // Set references.
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        // Set sizes.
        this.cellSize = 20; // Pixels.
        this.colCount = this.canvas.width / this.cellSize;
        this.rowCount = this.canvas.height / this.cellSize;

        // Create grid model.
        this.model = new GridModel(this.colCount, this.rowCount);

        console.log(this.model);

        // Listen for grid clicks.
        document.querySelector(".js-canvas").addEventListener("click", this.mark);
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

    mark(ev) {
        let x = ev.clientX,
            y = ev.clientY;


    }
}

export default Grid;