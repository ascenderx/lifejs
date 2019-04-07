class Camera {
    constructor(x = 0, y = 0, zoom = 0) {
        this._x = x;
        this._y = y;
        this._z = zoom;
    }
    
    get position() {
        return [this._x, this._y];
    }
    
    get x() {
        return this._x;
    }
    
    get y() {
        return this._y;
    }
    
    get zoom() {
        return this._z;
    }
    
    set position(point) {
        this._x = point[0];
        this._y = point[1];
    }
    
    set x(rhs) {
        this._x = rhs;
    }
    
    set y(rhs) {
        this._y = rhs;
    }
    
    moveTo(x, y) {
        this._x = x;
        this._y = y;
    }
    
    moveLeft(dx) {
        this._x -= dx;
    }
    
    moveRight(dx) {
        this._x += dx;
    }
    
    moveUp(dy) {
        this._y -= dy;
    }
    
    moveDown(dy) {
        this._y += dy;
    }
    
    move(dx, dy) {
        this._x += dx;
        this._y += dy;
    }
    
    set zoom(rhs) {
        this._z = rhs;
    }
    
    zoomIn(dz) {
        this._z += dz;
    }
    
    zoomOut(dz) {
        this._z -= dz;
    }
}
