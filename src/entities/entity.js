
class Entity {
    constructor(scene) {
        this.scene = scene;
        this.cellSize = scene.map.tilewidth;
        this.acc = 0;
    }

    get state() {
        return this.currentState;
    }

    set state(state) {
        this.currentState = state;
    }

    setPosition(col, row) {
        // Move to new cell.
        this.row = row;
        this.col = col;
    };

    /**
     * Moves along a calculated path to the specified location.
     * @param row
     * @param col
     */
    moveTo(row, col) {
        // Leave current cell.
        // this.scene.grid.model.grid[this.row][this.col].isOccupied = false;

        // Set new position.
        this.setPosition(row, col);
    };

    /**
     * Moves the entity one tile in the given direction.
     * @param dir
     */
    moveDir(dir) {
        
    }

    render() {
        this.scene.ctx.beginPath();
        this.scene.ctx.arc(this.col * this.cellSize + this.cellSize / 2 + 0.5, this.row * this.cellSize + this.cellSize / 2 + 0.5, this.model.size, 0, 2 * Math.PI, false);
        this.scene.ctx.fillStyle = this.model.fillStyle;
        this.scene.ctx.fill();
    }
}

export default Entity;