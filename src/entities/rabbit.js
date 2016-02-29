import Entity from './entity';

class Rabbit extends Entity {
    constructor() {
        super();
        this.fillStyle = '#000099'
    }

    setPosition(row, col) {
        this.row = row;
        this.col = col;
    }

    update(dt) {

    }
}

export default Rabbit;