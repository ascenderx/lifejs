class DrawHandler {
  constructor(cvs, grid) {
    this._cvs = cvs;
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight - 10;
    this._ctx = cvs.getContext('2d');
    this._ctx.translate(0.5, 0.5);
    this._scrW = cvs.width;
    this._scrH = cvs.height;
    this._bgColor = '#000000';
    this._fgColor = '#777777';
    this._grid = grid;
    this._camera = new Camera();
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
    let zoom = 2 ** (this._camera.zoom / 128);
    let offsetX = this._camera.x;
    let offsetY = this._camera.y;
    this._ctx.lineWidth = 2;
    this._ctx.strokeStyle = this._fgColor;
    this._ctx.beginPath();
    for (let c = 0; c <= this._grid.width; c++) {
      let x0Pre = c * this._grid.cellWidth;
      let y0Pre = 0;
      let x1Pre = x0Pre;
      let y1Pre = y0Pre + (this._grid.cellHeight * this._grid.height);
      
      let x0Zoom = x0Pre * zoom;
      let y0Zoom = y0Pre * zoom;
      let x1Zoom = x1Pre * zoom;
      let y1Zoom = y1Pre * zoom;
      
      let x0 = x0Zoom - offsetX;
      let y0 = y0Zoom - offsetY;
      let x1 = x1Zoom - offsetX;
      let y1 = y1Zoom - offsetY;
      
      this._ctx.moveTo(x0, y0);
      this._ctx.lineTo(x1, y1);
    }
    for (let r = 0; r <= this._grid.height; r++) {
      let x0Pre = 0;
      let y0Pre = r * this._grid.cellHeight;
      let x1Pre = x0Pre + (this._grid.cellWidth * this._grid.width);
      let y1Pre = y0Pre;
      
      let x0Zoom = x0Pre * zoom;
      let y0Zoom = y0Pre * zoom;
      let x1Zoom = x1Pre * zoom;
      let y1Zoom = y1Pre * zoom;
      
      let x0 = x0Zoom - offsetX;
      let y0 = y0Zoom - offsetY;
      let x1 = x1Zoom - offsetX;
      let y1 = y1Zoom - offsetY;
      
      this._ctx.moveTo(x0, y0);
      this._ctx.lineTo(x1, y1);
    }
    this._ctx.stroke();
}

  get camera() {
    return this._camera;
  }
}
