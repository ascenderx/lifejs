class DrawHandler {
  constructor(cvs, grid, entities) {
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
    this._entities = entities;

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
    
    // draw entities
    for (let entity of this._entities) {
      let position = entity.position;
      let drawData = entity.draw();
      let polygon = drawData.polygon;
      let color = drawData.color;
      let filled = drawData.filled;
      
      // TODO: account for camera position & zoom
      // get cell center
      let xc = position[0] + 0.5;
      let yc = position[1] + 0.5;
      
      // get pixel point
      let grid = this._grid;
      function getPixel(pt) {
        // compute polygon points within cell
        let xp = xc + 0.5 * pt[0];
        let yp = yc + 0.5 * pt[1];
        
        // scale to display
        return grid.computePixel(xp, yp);
      }
      let points = polygon.points;
      this._ctx.beginPath();
      // move to first point
      let px0 = getPixel(points[0]);
      this._ctx.moveTo(px0[0], px0[1]);
      // draw other points
      for (let p = 1; p < points.length; p++) {
        let px = getPixel(points[p]);
        this._ctx.lineTo(px[0], px[1]);
      }
      this._ctx.closePath();
      if (filled) {
        this._ctx.fillStyle = color;
        this._ctx.fill();
      } else {
        this._ctx.strokeStyle = color;
        this._ctx.stroke();
      }
    }
  }

  get camera() {
    return this._camera;
  }
}
