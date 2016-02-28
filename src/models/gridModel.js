import GridCellModel from './gridCellModel';

class GridModel {
    constructor(colCount, rowCount) {

        this.grid = [];

        // For each column, create a row array.
        for (let colId = 0; colId < colCount; colId++) {
            let row = []
            for (let rowId = 0; rowId < rowCount; rowId++) {
                // Push row into col.
                row.push(new GridCellModel(rowId, colId));
            }
            // Push row into grid.
            this.grid.push(row);
        }
    }
}

export default GridModel;