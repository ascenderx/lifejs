const _W_DIRS = {
  NONE: 0,
  N: 1,
  E: 2,
  S: 3,
  W: 4,
};
const _W_NUM_DIRS = Object.keys(_W_DIRS).length;
const _W_DRAW_DATA = new DrawData(DIAMOND, '#ff0000', false);

class Wanderer extends Moveable {
  constructor(x = 0, y = 0, speed = 1, sleepProbability = 0) {
    super(x, y, null, null);
    this._speed = speed;
    this._computeVelocity(this._generateDirection());
    this._sleepProb = sleepProbability;
    this._drawData = _W_DRAW_DATA;
  }
  
  _computeVelocity(direction) {
    switch (direction) {
      case _W_DIRS.N:
        this._dx = 0;
        this._dy = -this._speed;
        break;
      
      case _W_DIRS.E:
        this._dx = +this._speed;
        this._dy = 0;
        break;
      
      case _W_DIRS.S:
        this._dx = 0;
        this._dy = +this._speed;
        break;
      
      case _W_DIRS.W:
        this._dx = -this._speed;
        this._dy = 0;
        break;
      
      default:
        this._dx = 0;
        this._dy = 0;
    }
  }
  
  _generateDirection() {
    return randomInt(-5, _W_NUM_DIRS - 1);
  }
  
  move() {
    super.move();
    let dir = this._generateDirection();
    this._computeVelocity(dir);
  }
  
  draw() {
    return this._drawData;
  }
}
