## Garden of Forking Paths
  The garden of forking paths is a maze game made with JavaScript. Unique mazes are generated using a recursive backtracker algorithm.

  ![Garden of Forking Paths][screenshots/finish.png]

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

![Garden of Forking Paths][screenshots/game.png]

### FUTURE FEATURES
- [ ] Add music.
- [ ] Add mazes generated with different algorithms.
- [ ] Add levels to the game, levels that get incrementally harder.
- [ ] Implement a maze solver that the user must race.
