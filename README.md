## Garden of Forking Paths

### BACKGROUND

  A maze game. A maze is generated. The user attempts to solve it by moving a character through the maze.

### FUNCTIONALITY & MVP

  In this game, users will be able to:

  - [ ] Move the character through a maze and solve the maze.

  In addition, this project will include:

  - [ ] A modal describing the game and the algorithm used to generate the maze.
  - [ ] A production readme.

### WIREFRAMES

  This game will have a title at the top with the game residing at the center,
  taking up most of the window. At the right there will be an 'about' modal and links to my various pages.

  ![wireframes](https://github.com/calebomusic/Garden-of-Forking-Paths/blob/master/docs/mazes-wireframes.png)

### ARCHITECTURE AND TECHNOLOGIES

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering.
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`grid.js`: this script will hold the logic for the grid which hold the cells.
Cells will have neighbors which they may or may not be linked too.

`cell.js`: this script will hold the logic for the cells that make up the grid. It will setup up a basic grid.

'maze.js': This script will make a maze from a basic grid. This will be done by toggling the linked properties of the various cells.

'user.js': This script will house the user logic, in particular, manage user input.

'game.js': This script will house the game logic.


### IMPLEMENTATION TIMELINES

  1.  On day one I will implement a board with canvas that holds a grid with cells.
  2.  On day two, I will implement a maze generation algorithm. Either Prims, The Recursive Backtracker, or The Growing Tree Algorithm.
  3.  On day three, I will implement the ability to walk through a maze with a user.
  4.  On day four, I will implement game logic and improve the front end.

### BONUS FEATURES
- [ ] Add music.
- [ ] Add mazes generated with different algorithms.
- [ ] Add levels to the game, levels that get incrementally harder.
- [ ] Implement a maze solver that the user must race.
- [ ] Include a landing page where a user may select difficulty and a game.
