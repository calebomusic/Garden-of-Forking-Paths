const Grid = require('./grid');

const DX = { E: 1, W: -1, N:  0, S: 0 };
const DY = { E: 0, W:  0, N: -1, S: 1 };

function shuffle(array) {
  for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }

  return array;
}

class Maze {
  constructor(row, col, engine, world) {
    this.grid = new Grid(row, col, engine, world);
  }

  recursiveBacktracker() {
    let cells = [];
    let visited = [];

    let startingCell = this.randomCell();
    cells.push(startingCell);
    visited.push(startingCell);

    while (cells.length > 0) {
      let index = cells.length-1;
      let currentPos = cells[index];
      let [x, y] = currentPos;

      const newPos = this.recursiveBacktrackerStep(currentPos, visited);

      if (newPos) {
        const [nx, ny] = newPos
        this.grid.cells[x][y].link(this.grid.cells[nx][ny], true)
        cells.push([nx, ny]);
        visited.push([nx, ny]);
      } else {
        cells.pop();
      }
    }
    this.grid.configureWalls();
  }

  recursiveBacktrackerStep(currentPos, visited) {
    let [x, y] = currentPos;
    let randDir = shuffle(['N', 'S', 'E', 'W']);

    for (var i = 0; i < randDir.length; i++) {
      let dir = randDir[i]
      const [nx, ny] = [x + DX[dir], y + DY[dir]];

      if (this.inBounds(nx, ny) && this.unvisited(visited, nx, ny)) {
        return([nx, ny])
      }
    }

    return false;
  }

  unvisited(visited, nx, ny) {
    for (var i = 0; i < visited.length; i++) {
      if (visited[i][0] === nx && visited[i][1] === ny) {
        return false;
      }
    }

    return true;
  }

  inBounds(nx, ny) {
    const xMax = this.grid.cells.length;
    const yMax = this.grid.cells[0].length;

    return xMax > nx && yMax > ny && nx >= 0 && ny >= 0;
  }

  randomCell() {
    const x = Math.floor(Math.random() * this.grid.cells.length);
    const y = Math.floor(Math.random() * this.grid.cells[0].length);
    return [x, y];
  }
}

module.exports = Maze;
