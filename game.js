class Game {
  constructor(canvas) {
    // display settings
    this._cvs = canvas;
    const GRID_WIDTH = 50;
    const GRID_HEIGHT = 50;
    const CELL_WIDTH = 20;
    const CELL_HEIGHT = 20;
    this._grid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELL_WIDTH, CELL_HEIGHT);

    // game settings
    this._entities = [];
    const NUM_PLANTS = 30;
    for (let p = 0; p < NUM_PLANTS; p++) {
      let x = randIntExcl(0, GRID_WIDTH);
      let y = randIntExcl(0, GRID_HEIGHT);
      this._entities.push(new Plant(x, y));
    }
    
    // handlers
    this._hdlInput = new InputHandler();
    this._hdlDraw = new DrawHandler(canvas, this._grid, this._entities);
    
    // timer settings
    this._looper = null;
    this._paused = false;
    this._fps = 50;
    this._interval = Math.floor(1000 / this._fps);
  }
  
  _handleInput() {
    let cameraSpeed = 10;
    let cameraZoomSpeed = 10;
    let camera = this._hdlDraw.camera;
    let keysDown = this._hdlInput.getKeys();
    if (!("Shift" in keysDown)) {
      if ("ArrowRight" in keysDown) {
        camera.moveRight(cameraSpeed);
      } else if ("ArrowLeft" in keysDown) {
        camera.moveLeft(cameraSpeed);
      }
      if ("ArrowDown" in keysDown) {
        camera.moveDown(cameraSpeed);
      } else if ("ArrowUp" in keysDown) {
        camera.moveUp(cameraSpeed);
      }
    } else {
      if ("ArrowUp" in keysDown) {
        camera.zoomIn(cameraZoomSpeed);
      } else if ("ArrowDown" in keysDown) {
        camera.zoomOut(cameraZoomSpeed);
      }
    }
  }
  
  run() {
    this._looper = new Looper(() => {
      this._handleInput();
      this._hdlDraw.update();
    }, this._interval);
    this._looper.start();
  }
}
let cvs = document.getElementById('cvs');
let game = new Game(cvs);
game.run();
