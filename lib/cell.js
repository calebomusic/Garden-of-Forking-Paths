class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.north = null;
    this.east = null;
    this.west = null;
    this.south = null;
    this.links = {}
  }

  link(cell, bidi=true) {
    this.links[cell] = true;
    if (bidi) {
      cell.link(this, false)
    }

    return this;
  }

  unlink(cell, bidi=true) {
    delete this.links(cell)

    if (bidi) {
      cell.link(this, false)
    }

    return this;
  }

  isLinked(cell) {
    Object.keys(this.links).forEach( linkedCell => {
        if (cell.row === linkedCell.row && cell.col === linkedCell.col) {
          return true;
        }
    });
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
