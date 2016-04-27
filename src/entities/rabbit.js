import Entity from './entity';

class Rabbit extends Entity {
    constructor(scene) {
        super(scene);
        this.fillStyle = '#000099'
    };

    setPosition(col, row) {
        // Move to new cell.
        this.row = row;
        this.col = col;

        // Mark cell as occupied.
        // this.scene.map.model.grid[row][col].isOccupied = true;
    };

    moveTo(row, col) {
        // Leave current cell.
        // this.scene.grid.model.grid[this.row][this.col].isOccupied = false;

        // Set new position.
        this.setPosition(row, col);
    };

    update(dt) {
        // Do something every second.
        this.acc += dt;
        if (this.acc > 0.5) {
            this.acc = 0;

            this.destCol = 20;
            this.destRow = 20;

            // Find path to destination. findPath also moves entity: TODO it shouldn't.
            if (this.row !== this.destRow && this.col !== this.destCol) {
                this.scene.mapObj.findPath(this.col, this.row, this.destCol, this.destRow, this)
            }
        }
    };
}

export default Rabbit;