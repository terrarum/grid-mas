class GridCellModel {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.impassable = false;
        this.isOccupied = false;
    }
}

export default GridCellModel;