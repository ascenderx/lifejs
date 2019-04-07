const _DRAW_DATA_PLANT = new DrawData(
  SQUARE,
  '#00ff00',
  false
);

class Plant extends Entity {
  constructor(x, y) {
    super(x, y);
  }
  
  draw() {
    return _DRAW_DATA_PLANT;
  }
}
