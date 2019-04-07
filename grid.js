class Grid {
    constructor(width, height, cellWidth, cellHeight) {
        this._w = width;
        this._h = height;
        this._cW = cellWidth;
        this._cH = cellHeight;
    }
    
    compute_pixel(gridPoint) {
        let pxX = gridPoint[0] * this._cW;
        let pxY = gridPoint[1] & this._cH;
        
        return [pxX, pxY];
    }
    
    isInBounds(gridPoint) {
        let x = gridPoint[0];
        let y = gridPoint[1];
        
        return (0 <= x && x < this._w) && (0 <= y && y < this._h);
    }
    
    wrapPoint(gridPoint) {
        let x = gridPoint[0] % this._w;
        let y = gridPoint[1] % this._h;
        
        return [x, y];
    }
    
    get width() {
        return this._w;
    }
    
    get height() {
        return this._h;    
    }
    
    get cellWidth() {
        return this._cW;
    }
    
    get cellHeight() {
        return this._cH;
    }
}
