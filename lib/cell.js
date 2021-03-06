import { isEqual } from 'lodash';

class Cell {
  constructor(row, col, pos) {
    this.row = row;
    this.col = col;
    this.north = null;
    this.east = null;
    this.west = null;
    this.south = null;
    this.links = {};
    this.pos = [];
    this.distance = 0;
  }

  link(cell, bidi=true) {
    const dir = this.findDir(cell);

    this.links[dir] = cell;

    if (bidi) {
      cell.link(this, false)
    }

    return this;
  }

  findDir(cell) {
    if (isEqual(this.north, cell)) {
      return 'N';
    } else if (isEqual(this.south, cell)) {
      return 'S';
    } else if (isEqual(this.west, cell)) {
      return 'W';
    } else if (isEqual(this.east, cell)) {
      return 'E';
    }
  }

  unlink(cell, bidi=true) {
    const dir = this.findDir(cell);

    delete this.links(dir);

    if (bidi) {
      cell.link(this, false);
    }

    return this;
  }

  isLinked(cell) {
    if (!cell) {
      return undefined;
    }

    const linkedDirs = Object.keys(this.links);

    for (var i = 0; i < linkedDirs.length; i++) {
      if (isEqual(this.links[linkedDirs[i]], cell)) {
        return true;
      }
    }

    return false;
  }
  
  neighbors() {
    let list = []

    if (this.north) {
      list.push(this.north);
    }
    if (this.west) {
      list.push(this.west);
    }
    if (this.east) {
      list.push(this.east);
    }
    if (this.south) {
      list.push(this.south);
    }
  }
}

module.exports = Cell;
