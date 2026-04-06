import { WindowResize, KeyListener, MyCanvas } from "../../../scripts/index.js";
const colours = ['white', 'black'];
const step = 2;
const ratio = 4;


const canvasInstance = new MyCanvas({ context: '2d', size: getCanvasDimension() });
new KeyListener({ event: 'keydown', element: canvasInstance.canvas });

new WindowResize({
    callback: () => {
        const { width, height } = getCanvasDimension();
        canvasInstance.canvas.width = width;
        canvasInstance.canvas.height = height;
    }
});

function getCanvasDimension() {
    return {
        width: Math.floor(window.innerWidth / ratio), height: Math.floor(window.innerHeight / ratio)
    }
}

function drawPixels() {
    for (let y = 0; y < canvasInstance.canvas.height; y = y + step) {
        for (let x = 0; x < canvasInstance.canvas.width; x = x + step) {
            let color = colours[Math.floor(Math.random() * 2)];
            canvasInstance.drawRectangle(color, { x, y }, { width: step, height: step });
        }
    }
}
function animate() {
    canvasInstance.clearScreen();
    drawPixels();
    requestAnimationFrame(animate);
}

function setup() {
    animate();
}

setup();