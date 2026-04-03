
class WindowResize {
    constructor(data) {
        this.initialise(data);
    }

    initialise = (data) => {
        const { callback = this.defaultListener, options = null } = data;
        window.addEventListener('resize', callback, options);
    }

    defaultListener = (event) => {
        console.log(event);
    }
}

export { WindowResize };