class InputHandler {
    constructor() {
        this._keys = {};
        
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
}
