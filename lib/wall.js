class Wall {
  constructor(open, vertical, pos){
    this.open = open;
    this.vertical = vertical;
    this.pos = pos;
  }

  draw(ctx) {
    if (this.open) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = "black";
    }

    if (this.vertical) {
      ctx.fillRect(this.pos[0], this.pos[1], 2, 50);
    } else {
      ctx.fillRect(this.pos[0], this.pos[1], 50, 2);
    }
  }
}

module.exports = Wall;
