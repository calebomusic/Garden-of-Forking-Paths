import { Engine, World, Bodies } from 'matter-js/src/module/main.js'

const Cell = require('./cell');
const Wall = require('./wall');

class Grid {
  constructor(rows, cols, engine, world) {
    this.rows = rows;
    this.cols = cols;
    this.cells = this.prepareGrid();
    this.configureCells();
    // this.configureWalls();
    this.configureWalls = this.configureWalls.bind(this);
    this.world = world;
    this.engine = engine;
    this.walls = [];
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

    // this.toString();

    this.cells.forEach( (row, i) => {
      let top = [];
      let bottom = [];
      let wall;

      row.forEach( (cell, j) => {

        // TODO: bring this back
        // westmost wall
        top.push(Bodies.rectangle(0, (i + 1) * 32 + 17, 2, 32, { isStatic: true }));

        // northmost wall
        bottom.push(Bodies.rectangle(j * 32 + 18, 32, 32, 2, { isStatic: true }));
        // bottom.push(new Wall(false, false, [(j) * 32, 32]));

        if (!cell.isLinked(cell.east)) {
          // top.push(new Wall(false, true, [(j + 1) * 32, (i + 1) * 32]));
          top.push(Bodies.rectangle((j + 1) * 32, (i + 1) * 32 + 17, 2, 32, { isStatic: true }));
        }

        if (!cell.isLinked(cell.south)) {
          // bottom.push(new Wall(false, false, [(j) * 32, (i + 2) * 32]));
          bottom.push(Bodies.rectangle(j * 32  + 18, (i + 2) * 32, 32, 2,  { isStatic: true }));
        }
      })

      walls.push(top);
      walls.push(bottom);
    })

    this.walls = walls;
    if (this.walls.length > 0 && this.engine.world) {
      this.toString();
      const flattenedWalls = this.walls.reduce( (a, b) => a.concat(b));
      World.add(this.engine.world, flattenedWalls)
    }
  }

  toString() {
    let output;
    this.cells.forEach( row => {
      let top = "\n|";
      let bottom = "+";

      row.forEach( cell => {
        let body = '   '
        let east_boundary = cell.isLinked(cell.east) ? ' ' : "|"

        top = top + body + east_boundary

        let south_boundary = cell.isLinked(cell.south) ? "   " : "---";
        bottom = bottom + south_boundary + '+'
      })
      output = output + top + '\n'
      output = output + bottom +  '\n'
    })

    console.log(output);
  }

  draw(ctx) {
    // this.eachWall( wall => wall.draw(ctx));
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
