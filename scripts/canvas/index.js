import { canvasDefault } from "./const/index.js"

class MyCanvas {

    constructor(options) {
        this.initialise(options);
    }

    initialise = (options) => {
        const { context = canvasDefault.context, size = canvasDefault.size } = options;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext(context);
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        document.body.appendChild(this.canvas);
    }

    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillScreen = (color = canvasDefault.fillStyle) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle = (color = "blue", position = { x: 0, y: 0 }, size = { width: 200, height: 50 }) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(position.x, position.y, size.width, size.height);
    }

    drawCircle = (color, center, radius) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(center.x, center.y, radius, Math.PI * 2, false);
        this.ctx.fill();
    }
}

export {
    MyCanvas
}