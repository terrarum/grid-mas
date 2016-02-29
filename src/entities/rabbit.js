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
        if (this.acc > 1) {
            this.acc = 0;
            this.moveTo(this.row + 1, this.col)
        }
    }
}

export default Rabbit;