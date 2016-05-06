import Entity from './entity';

class Fox extends Entity {
    constructor(scene) {
        super(scene);
        this.fillStyle = '#990000';
        this.size = 6;
    };

    setPosition(col, row) {
        // Move to new cell.
        this.row = row;
        this.col = col;
    };

    // moveTo makes more sense when it does more than call setPosition.
    moveTo(row, col) {
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

export default Fox;