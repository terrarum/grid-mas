import Entity from './entity';
import rabbitModel from '../models/rabbitModel';

class Rabbit extends Entity {
    constructor(scene, pos) {
        super(scene);
        this.model = rabbitModel;

        // Set starting position.
        if (pos !== undefined) {
            this.setPosition(pos.x, pos.y);
        }
    };
    
    update(dt) {
        // Call behaviour function of current state.
        
        
        // Do something every second.
        // TODO take state into account.
        this.acc += dt;
        if (this.acc > 0.5) {
            this.acc = 0;

            this.destCol = 2;
            this.destRow = 2;

            // Find path to destination. findPath also moves entity: TODO findPath should not move the entity.
            if (this.row !== this.destRow && this.col !== this.destCol) {
                this.scene.mapObj.findPath(this.col, this.row, this.destCol, this.destRow, this)
            }
        }
    };
}

export default Rabbit;
