class GridCellModel {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.cost = 0;
        this.isOccupied = false;
    }
}

export default GridCellModel;