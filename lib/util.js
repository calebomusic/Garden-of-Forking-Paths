import { isEqual } from 'lodash';

const Util = {
  // FInd distance between two points
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  // TODO: improve variable naming
  checkCollisionWithLineIntercepts(circle, startPos, endPos){
    let a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = endPos[0] - startPos[0];
    v1.y = endPos[1] - startPos[1];
    v2.x = startPos[0] - circle.pos[0];
    v2.y = startPos[1] - circle.pos[1];
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));

    if(isNaN(d)){ // no intercept
        return false;
    }

    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;
    retP1 = {};   // return points
    retP2 = {}
    ret = []; // return array

    if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
        retP1.x = startPos[0] + v1.x * u1;
        retP1.y = startPos[1] + v1.y * u1;
        ret[0] = retP1;
    }
    if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
        retP2.x = startPos[0] + v1.x * u2;
        retP2.y = startPos[0].y + v1.y * u2;
        ret[ret.length] = retP2;
    }

    if (ret.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Util;
