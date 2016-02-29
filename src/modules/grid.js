import * as Easystar from 'easystarjs';
import GridModel from '../models/gridModel';

let easystar = new Easystar.js();

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

        // Create grid model.
        this.model = new GridModel(this.rowCount, this.colCount);

        // Listen for grid clicks.
        document.querySelector(".js-canvas").addEventListener("click", (ev) => {
            this.mark(ev);
        });

        // Set some impassable tiles.
        this.model.grid[0][16].cost = 1;
        this.model.grid[1][15].cost = 10;
        this.model.grid[2][14].cost = 10;
        this.model.grid[3][13].cost = 10;
        this.model.grid[4][12].cost = 10;
        this.model.grid[5][11].cost = 10;
        this.model.grid[6][10].cost = 10;
        this.model.grid[7][9].cost = 10;
        this.model.grid[8][8].cost = 10;
        this.model.grid[9][7].cost = 10;
        this.model.grid[10][6].cost = 10;
        this.model.grid[11][5].cost = 10;
        this.model.grid[12][4].cost = 10;
        this.model.grid[13][3].cost = 10;
        this.model.grid[14][2].cost = 10;
        this.model.grid[15][1].cost = 10;
    }

    render() {
        // Set up grid rendering styles.
        this.ctx.strokeStyle = '#aaaaaa';
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();

        // Draw rows.
        for (let i = 0; i < this.rowCount + 1; i++) {
            this.ctx.moveTo(0, this.cellSize * i + 0.5);
            this.ctx.lineTo(this.gridWidth, this.cellSize * i + 0.5);
        }

        // Draw columns.
        for (let i = 0; i < this.colCount + 1; i++) {
            this.ctx.moveTo(this.cellSize * i + 0.5, 0);
            this.ctx.lineTo(this.cellSize * i + 0.5, this.gridHeight);
        }

        // Render impassable cells.
        this.model.grid.forEach((row, rowCount) => {
            row.forEach((cell, colCount) => {
                if (cell.cost === 10) {
                    this.ctx.fillRect(
                        colCount * this.cellSize,   // x
                        rowCount * this.cellSize,   // y
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
        let clickRow = Math.floor(y / this.cellSize),
            clickCol = Math.floor(x / this.cellSize);

        // Toggle grid cell in model.
        let clickCell = this.model.grid[clickRow][clickCol];
        clickCell.cost = clickCell.cost === 10 ? 0 : 10;
    }

    getSimpleGrid() {
        let simpleGrid = [];

        this.model.grid.forEach((row, rowCount) => {
            let rowArr = [];
            row.forEach((cell, colCount) => {
                rowArr.push(cell.cost);
            });
            simpleGrid.push(rowArr);
        });
        return simpleGrid;
    }

    findPath(col, row, targetCol, targetRow, entity) {
        easystar.setGrid(this.getSimpleGrid());
        easystar.setAcceptableTiles([0, 1]);
        easystar.setTileCost(1, 1.1);
        easystar.enableDiagonals();
        easystar.disableCornerCutting();
        easystar.findPath(col, row, targetCol, targetRow, (path) => {
            entity.moveTo(path[1].y, path[1].x);
        });
        easystar.calculate();
    }
}

export default Grid;