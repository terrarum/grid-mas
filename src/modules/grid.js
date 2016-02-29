import GridModel from '../models/gridModel';

class Grid {
    constructor(ctx) {
        // Set references.
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        // Set sizes.
        this.cellSize = 20; // Pixels.
        this.rowCount = Math.floor(this.canvas.height / this.cellSize);
        this.colCount = Math.floor(this.canvas.width / this.cellSize);

        this.gridWidth = this.colCount * this.cellSize;
        this.gridHeight = this.rowCount * this.cellSize;
        this.gridOffsetX = Math.floor((window.innerWidth - this.gridWidth) / 2);
        this.gridOffsetY = Math.floor((window.innerHeight - this.gridHeight) / 2);

        // Create grid model.
        this.model = new GridModel(this.rowCount, this.colCount);

        // Listen for grid clicks.
        document.querySelector(".js-canvas").addEventListener("click", (ev) => {
            this.mark(ev);
        });
    }

    render() {
        // Set up grid rendering styles.
        this.ctx.strokeStyle = '#aaaaaa';
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();

        // Draw rows.
        for (let i = 0; i < this.rowCount + 1; i++) {
            this.ctx.moveTo(0 + this.gridOffsetX, this.cellSize * i + 0.5 + this.gridOffsetY);
            this.ctx.lineTo(this.gridWidth + this.gridOffsetX, this.cellSize * i + 0.5 + this.gridOffsetY);
        }

        // Draw columns.
        for (let i = 0; i < this.colCount + 1; i++) {
            this.ctx.moveTo(this.cellSize * i + 0.5 + this.gridOffsetX, 0 + this.gridOffsetY);
            this.ctx.lineTo(this.cellSize * i + 0.5 + this.gridOffsetX, this.gridHeight + this.gridOffsetY);
        }

        // Render impassable cells.
        this.model.grid.forEach((row, rowCount) => {
            row.forEach((cell, colCount) => {
                if (cell.impassable) {
                    this.ctx.fillRect(
                        colCount * this.cellSize + this.gridOffsetX,   // x
                        rowCount * this.cellSize + this.gridOffsetY,   // y
                        this.cellSize,              // width
                        this.cellSize               // height
                    );
                }
            })
        });

        // Draw!
        this.ctx.stroke();
        this.ctx.fill();
    }

    mark(ev) {
        let x = ev.clientX,
            y = ev.clientY;

        // Get col and row of click.
        let clickRow = Math.floor((y - this.gridOffsetY) / this.cellSize),
            clickCol = Math.floor((x - this.gridOffsetX) / this.cellSize);

        // Toggle grid cell in model.
        let clickCell = this.model.grid[clickRow][clickCol];
        clickCell.impassable = clickCell.impassable ? false : true;
    }
}

export default Grid;