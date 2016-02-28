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

        // Listen for grid clicks.
        document.querySelector(".js-canvas").addEventListener("click", (ev) => {
            this.mark(ev);
        });
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
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';

        // Render impassable cells.
        this.model.grid.forEach((row, rowCount) => {
            row.forEach((cell, colCount) => {
                if (cell.impassable) {
                    this.ctx.fillRect(
                        rowCount * this.cellSize,   // x
                        colCount * this.cellSize,   // y
                        this.cellSize,              // width
                        this.cellSize               // height
                    );
                }
            })
        });

        // Draw!
        this.ctx.fill();
    }

    mark(ev) {
        let x = ev.clientX,
            y = ev.clientY;

        // Get col and row of click.
        let clickCol = Math.floor(x / this.cellSize),
            clickRow = Math.floor(y / this.cellSize);

        // Toggle grid cell in model.
        let clickCell = this.model.grid[clickCol][clickRow];
        clickCell.impassable = clickCell.impassable ? false : true;
    }
}

export default Grid;