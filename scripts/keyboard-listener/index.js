import { toggleFullScreen } from "../utils/index.js"

class KeyListener {

    constructor(data) {
        this.initialise(data);
    }

    initialise = (data) => {
        const { event, callback = this.defaultListener, options = null } = data;
        document.addEventListener(event, callback, options);
    }

    defaultListener = (event) => {
        switch (event.key) {
            case 'f':
            case 'F':
                toggleFullScreen();
        }
    }
}

export { KeyListener };