import GridCellModel from './gridCellModel';

class GridModel {
    constructor(rowCount, colCount) {

        this.grid = [];

        // For each row, create a row array.
        for (let rowId = 0; rowId < rowCount; rowId++) {
            let row = [];
            for (let colId = 0; colId < colCount; colId++) {
                row.push(new GridCellModel(rowId, colId));
            }
            // Push row
            this.grid.push(row);
        }
    }
}

export default GridModel;