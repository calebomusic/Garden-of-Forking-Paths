import { Engine, World, Bodies } from 'matter-js/src/module/main.js'


function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Wall {
  constructor(open, vertical, startPos){
    this.open = open;
    this.vertical = vertical;
    this.startPos = startPos;
    this.endPos = startPos;
    this.color = randomColor();
    this.body =
    setInterval(() => this.color = randomColor(), (Math.random() + .1) * 5000);
  }

  draw(ctx) {
    if (this.open) {
      ctx.fillStyle = "white";
    } else {
      ctx.fillStyle = this.color;
    }

    if (this.vertical) {
      ctx.fillRect(this.startPos[0], this.startPos[1], 2, 32);
      this.endPos = [this.startPos[0] + 2, this.startPos[1] + 32];
    } else {
      ctx.fillRect(this.startPos[0], this.startPos[1], 32, 2);
      this.endPos = [this.startPos[0] + 32, this.startPos[1] + 2];
    }
  }


}

module.exports = Wall;
