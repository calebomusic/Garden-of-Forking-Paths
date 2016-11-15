const Cell = require('./cell');
const Wall = require('./wall');

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = this.prepareGrid();
    this.configureCells();
    this.configureWalls();
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
      if (this.inBounds(col+1, this.cols)) {
        cell.east = this.cells[row][col+1];
      }

      if (this.inBounds(col-1, this.cols)) {
        cell.west = this.cells[row][col-1];
      }
    })
  }

  configureWalls() {
    let walls = [];

    for (var i = 0; i < this.cells.length; i++) {
      let top = [];
      let bottom = [];

      for (var j = 0; j < this.cells.length; j++) {
        let cell = this.cells[i][j];

        if (cell.isLinked(cell.east)) {
          top.push(new Wall(true, true, [(i + 1) * 50, (j + 1) * 50]));
        } else {
          top.push(new Wall(false, true, [(i + 1) * 50, (j + 1) * 50]));
        }

        if (cell.isLinked(cell.south)) {
          bottom.push(new Wall(true, false, [i * 50, (j + 2) * 50]));
        } else {
          bottom.push(new Wall(false, false, [i * 50, (j + 2) * 50]));
        }
      }

      walls.push(top);
      walls.push(bottom);
    }

    this.walls = walls;
  }

  draw(ctx) {
    this.eachWall( wall => wall.draw(ctx));
  }

  inBounds(newCoord, max) {
    if (max === this.rows) {
      return newCoord >= 0 && newCoord < this.rows;
    } else {
      return newCoord >= 0 && newCoord < this.cols;
    }
  }

  eachCell(callback) {
    this.cells.forEach( row => {
      row.forEach( cell => {
        callback(cell);
      })
    });
  }

  eachWall(callback) {
    this.walls.forEach( row => {
      row.forEach( cell => {
        callback(cell);
      })
    })
  }

  everyCellAndWall(callback) {
    this.maze.forEach( row => {
      row.forEach( cell => {
        callback(cell);
      })
    })
  }
}

module.exports = Grid;
