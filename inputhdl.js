class InputHandler {
    constructor() {
        this._keys = {};
        this._mouse = {
            x: null,
            y: null,
            button: null,
        };
        
        window.addEventListener('keydown', (event) => {
            if (!(event.key in this._keys)) {
                this._keys[event.key] = 0;
            }
            this._keys[event.key]++;
        });
        
        window.addEventListener('keyup', (event) => {
            if (event.key in this._keys) {
                delete this._keys[event.key];
            }
        });
        
        window.addEventListener('mousedown', (event) => {
            this._mouse.button = event.which;
            this._mouse.x = event.clientX;
            this._mouse.y = event.clientY;
        });
        
        window.addEventListener('mouseup', (event) => {
            this._mouse.button = null;
            this._mouse.x = event.clientX;
            this._mouse.y = event.clientY;
        });
        
        window.addEventListener('mousemove', (event) => {
            this._mouse.x = event.clientX;
            this._mouse.y = event.clientY;
        });
    }
    
    getKeys() {
        return this._keys;
    }
    
    getKey(keyName) {
        if (keyName in this._keys) {
            return this._keys[keyName];
        }
        
        return null;
    }
    
    isKeyDown(keyName) {
        return keyName in this._keys;
    }
    
    getMousePosition() {
        return [this._mouse.x, this._mouse.y];
    }
    
    getMouseX() {
        return this._mouse.x;
    }
    
    getMouseY() {
        return this._mouse.y;
    }
    
    getMouseButton() {
        return this._mouse.button;
    }
    
    isMouseButtonDown(button) {
        return this._mouse.button === button;    
    }
}
