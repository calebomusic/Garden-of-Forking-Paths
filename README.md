## Garden of Forking Paths
  The garden of forking paths is a maze game made with JavaScript. Unique mazes are generated using a recursive backtracker algorithm.

  [LIVE](https://calebomusic.github.io/garden-of-forking-paths/)

  ![Garden of Forking Paths](https://github.com/calebomusic/garden-of-forking-paths/blob/master/screenshots/finish.png)

### MAZE GENERATION

 The maze generating algorithm is implemented with two primary methods `recursiveBacktracker` and `recursiveBacktrackerStep`.

 `recursiveBacktracker` begins the path building at a random cell and ends it when every cell has been visited. Visited positions are tracked by `visited`. `cells` holds a stack of cells where the current position is the last item in the array, the previously visited position, if there is one, is the second to last item, and so on. When a new position is returned by `recursiveBacktrackerStep` (below), a path is made between the cell occupying the current position and the cell occupying the new position. The new position then becomes the current position as it is pushed into the `cells` stack.

 When the current position has no neighbors which are unvisited, it is popped of the `cells` stack and the previously visited position becomes the current position. When `cells` is empty, all cells have been visited. When all of cells have been configured, the walls are configured to mirror where the cells do and do not have paths to their neighbors.

  ```javascript
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
  ```

  Which cell becomes the next current cell is handled by `recursiveBacktrackerStep`. `recursiveBacktrackerStep` receives the current position and the `visited` positions array. It selects an neighboring position randomly by shuffling an array of keys for `DX` and `DY` (below) and iterating through though keys. `inBounds` and `unvisited` are utilized as helper methods to check that the selected position is both unvisited and inbounds. If this neighboring position is unvisited it is returned, otherwise the next neighboring position is selected. If all neighboring positions have been visited, false is returned.

  ```javascript
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
  ```

  `DX` and `DY`:
  ```javascript
  const DX = { E: 1, W: -1, N:  0, S: 0 };
  const DY = { E: 0, W:  0, N: -1, S: 1 };
  ```

### ARCHITECTURE AND TECHNOLOGIES

This project utilizes object oriented programming and is implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic.
- [Keymaster](https://github.com/madrobby/keymaster), a micro-library to manage user key input.
- [matter-js](http://brm.io/matter-js/) physics engine to handle collisions.
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there are seven scripts involved in this project:

`cell.js`: holds the logic for the cell objects that make up the grid.

`grid.js`: this script will hold the logic for the grid which holds and configures the cells and configures the walls surrounding the cells.

`maze.js`: manipulates the links between cells in the grid in order to generate a maze.

`player.js`: This script houses the user logic, in particular, managing user input.

`game`: Handles stepping and finishing logic.

`stage.js`: Houses the animation logic and binds key handlers.

`garden.js`: creates a game, a stage, a matter-js world and engine, in addition to adding event listeners for the `about` modal and `generate` button.

![Garden of Forking Paths](https://github.com/calebomusic/garden-of-forking-paths/blob/master/screenshots/game.png)

### FUTURE FEATURES
- [ ] Add music.
- [ ] Add mazes generated with different algorithms.
- [ ] Add levels to the game, levels that get incrementally harder.
- [ ] Implement a maze solver that the user must race.
