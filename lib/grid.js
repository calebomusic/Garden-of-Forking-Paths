import { World, Bodies } from 'matter-js/src/module/main.js'

const Cell = require('./cell');

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}


class Grid {
  constructor(rows, cols, engine, world) {
    this.rows = rows;
    this.cols = cols;
    this.cells = this.prepareGrid();
    this.configureCells();
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

    this.cells.forEach( (row, i) => {
      let top = [];
      let bottom = [];
      let wall;

      row.forEach( (cell, j) => {
        // westmost wall
        top.push(Bodies.rectangle(178, (i + 1) * 32 + 17, 2, 31,
          { isStatic: true,
            render: {
             fillStyle: randomColor(),
             strokeStyle: randomColor(),
             lineWidth: 2
            },
            mass: 20,
           }
          )
        );

        // northmost wall
        bottom.push(Bodies.rectangle(j * 32 + 196, 32, 31, 2,
          { isStatic: true,
            render: {
             fillStyle: randomColor(),
             strokeStyle: randomColor(),
             lineWidth: 2
             },
            mass: 3,
           }
          )
        );

        if (!cell.isLinked(cell.east)) {
          top.push(Bodies.rectangle((j + 1) * 32 + 178, (i + 1) * 32 + 17, 2, 31,
            { isStatic: true,
              render: {
               fillStyle: randomColor(),
               strokeStyle: randomColor(),
               lineWidth: 2
              },
              mass: 1000,
             }
            )
          );
        }

        if (!cell.isLinked(cell.south)) {
          bottom.push(Bodies.rectangle(j * 32  + 196, (i + 2) * 32, 31, 2,
            { isStatic: true,
              render: {
               fillStyle: randomColor(),
               strokeStyle: randomColor(),
               lineWidth: 2
              },
              mass: 17
             }
            )
          );
        }
      });

      walls.push(top);
      walls.push(bottom);
    })

    this.walls = walls;

    if (this.walls.length > 0 && this.engine.world) {
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
}

module.exports = Grid;
