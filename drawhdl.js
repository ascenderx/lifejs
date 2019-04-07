class DrawHandler {
  constructor(cvs, grid) {
    this._cvs = cvs;
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight - 10;
    this._ctx = cvs.getContext('2d');
    this._scrW = cvs.width;
    this._scrH = cvs.height;
    this._bgColor = '#000000';
    this._fgColor = '#777777';
    this._grid = grid;
    this._camera = [0, 0, 0];
    this._center = this._scrW / 2;
    
    window.addEventListener('resize', () => {
        this._cvs.width = window.innerWidth;
        this._cvs.height = window.innerHeight - 10;
        this._scrW = this._cvs.width;
        this._scrH = this._cvs.height;
    });
  }
  
  update() {
    // draw a black background
    this._ctx.fillStyle = this._bgColor;
    this._ctx.fillRect(0, 0, this._scrW, this._scrH);
    
    // draw a grid
    let zoom = 10 ** (this._camera[2] / 1000);
    this._ctx.strokeStyle = this._fgColor;
    this._ctx.beginPath();
    for (let c = 0; c <= this._grid.width; c++) {
        let x0 = c * this._grid.cellWidth - this._camera[0];
        let y0 = 0 - this._camera[1];
        let x1 = x0;
        let y1 = y0 + (this._grid.cellHeight * this._grid.height);
        
        this._ctx.moveTo(x0 * zoom, y0 * zoom);
        this._ctx.lineTo(x1 * zoom, y1 * zoom);
    }
    for (let r = 0; r <= this._grid.height; r++) {
        let x0 = 0 - this._camera[0];
        let y0 = r * this._grid.cellHeight - this._camera[1];
        let x1 = x0 + (this._grid.cellWidth * this._grid.width);
        let y1 = y0;
        
        this._ctx.moveTo(x0 * zoom, y0 * zoom);
        this._ctx.lineTo(x1 * zoom, y1 * zoom);
    }
    this._ctx.stroke();
  }
  
  getCameraX() {
    return camera[0];
  }
  
  getCameraY() {
    return camera[1];
  }
  
  getCameraZ() {
    return camera[2];
  }
  
  moveCamera(dx, dy) {
    this._camera[0] += dx;
    this._camera[1] += dy;
  }
  
  moveCameraLeft(dx) {
    this._camera[0] -= dx;
  }
  
  moveCameraRight(dx) {
    this._camera[0] += dx;
  }
  
  moveCameraUp(dy) {
    this._camera[1] -= dy;
  }
  
  moveCameraDown(dy) {
    this._camera[1] += dy;
  }
  
  moveCameraTo(x, y) {
    this._camera[0] = x;
    this._camera[1] = y;
  }
  
  zoomCameraIn(dz) {
    this._camera[2] += dz;
  }
  
  zoomCameraOut(dz) {
    this._camera[2] -= dz;
  }
  
  zoomCameraTo(z) {
    this._camera[2] = z;
  }
}