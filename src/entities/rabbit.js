import Entity from './entity';

class Rabbit extends Entity {
    constructor() {
        super();
        this.fillStyle = '#000099'
    }

    setPosition(row, col) {
        // Move to new cell.
        this.row = row;
        this.col = col;

        // Mark cell as occupied.
        window.grid.model.grid[row][col].isOccupied = true;
    }

    moveTo(row, col) {
        // Leave current cell.
        window.grid.model.grid[this.row][this.col].isOccupied = false;

        // Set new position.
        this.setPosition(row, col);
    }

    update(dt) {
        // Do something every second.
        this.acc += dt;
        if (this.acc > 0.5) {
            this.acc = 0;
            window.grid.findPath(this.col, this.row, 20, 20, this)
        }
    }
}

export default Rabbit;