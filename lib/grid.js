const Cell = require('./cell');

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = this.prepareGrid();
    this.configureCells();
  }

  prepareGrid() {
    let cells = [];

    for (var i = 0; i < this.rows; i++) {
      cells[i] = [];
      for (var j = 0; j < this.cols; j++) {
        cells[i].push(new Cell(i, j));
      }
    }

    return cells;
  }

  configureCells() {
    this.eachCell( cell => {
      let row = cell.row;
      let col = cell.col;

      if (this.inBounds(row-1, this.rows)) {
        cell.north = this.cells[row-1][col];
      }
      if (this.inBounds(row+1, this.rows)) {
        cell.south = this.cells[row+1][col];
      }
      if (this.inBounds(col-1, this.cols)) {
        cell.east = this.cells[row][col-1];
      }

      if (this.inBounds(col+1, this.cols)) {
        cell.west = this.cells[row][col+1];
      }
    })
  }

  inBounds(newCoord, dimension) {
    if (dimension === this.rows) {
      return newCoord >= 0 && newCoord < this.rows;
    } else {
      return newCoord >= 0 && newCoord < this.cols;
    }
  }

  eachCell(callback) {
    this.cells.forEach( (row) => {
      row.forEach( (cell) => {
        callback(cell);
      })
    });
  }
}

module.exports = Grid;
