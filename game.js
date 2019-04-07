class Game {
  constructor(canvas) {
    // display settings
    this._cvs = canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 10;
    this._grid = new Grid(100, 100, 20, 20);
    
    // handlers
    this._hdlInput = new InputHandler();
    this._hdlDraw = new DrawHandler(canvas, this._grid);
    
    // timer settings
    this._looper = null;
    this._paused = false;
    this._fps = 50;
    this._interval = Math.floor(1000 / this._fps);
  }
  
  _handleInput() {
    let cameraSpeed = 10;
    let cameraZoomSpeed = 10;
    let keysDown = this._hdlInput.getKeys();
    if (!("Shift" in keysDown)) {
        if ("ArrowRight" in keysDown) {
            this._hdlDraw.moveCameraRight(cameraSpeed);
        } else if ("ArrowLeft" in keysDown) {
            this._hdlDraw.moveCameraLeft(cameraSpeed);
        }
        if ("ArrowDown" in keysDown) {
            this._hdlDraw.moveCameraDown(cameraSpeed);
        } else if ("ArrowUp" in keysDown) {
            this._hdlDraw.moveCameraUp(cameraSpeed);
        }
    } else {
        if ("ArrowUp" in keysDown) {
            this._hdlDraw.zoomCameraIn(cameraZoomSpeed);
        } else if ("ArrowDown" in keysDown) {
            this._hdlDraw.zoomCameraOut(cameraZoomSpeed);
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
