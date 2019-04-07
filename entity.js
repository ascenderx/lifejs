class Entity {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    
    draw() { }
    
    get position() {
        return [this._x, this._y];
    }
    
    get x() {
        return this._x;
    }
    
    get y() {
        return this._y;
    }
    
    set position(gridPoint) {
        this._x = gridPoint[0];
        this._y = gridPoint[1];
    }
    
    set x(rhs) {
        this._x = rhs;
    }
    
    set y(rhs) {
        this._y = rhs;
    }
}
