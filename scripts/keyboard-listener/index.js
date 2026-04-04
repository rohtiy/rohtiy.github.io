import { toggleFullScreen } from "../utils/index.js"

class KeyListener {

    constructor(data) {
        this.initialise(data);
    }

    initialise = (data = {}) => {
        const { event = 'keydown', element, callback = (event) => this.defaultListener(event, element), options = null } = data;
        document.addEventListener(event, callback, options);
    }

    defaultListener = (event, element) => {
        switch (event.key) {
            case 'f':
            case 'F':
                toggleFullScreen(element);
        }
    }
}

export { KeyListener };