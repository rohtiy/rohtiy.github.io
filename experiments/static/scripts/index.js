import { MyCanvas } from "../../../scripts/canvas/index.js";
import { KeyListener } from "../../../../scripts/keyboard-listener/index.js";
import { WindowResize } from "../../../scripts/window-resize/index.js";


const canvasInstance = new MyCanvas({ context: '2d', size: { width: window.innerWidth, height: window.innerHeight } });
new KeyListener({ event: 'keydown' });

new WindowResize({
    callback: () => {
        canvasInstance.canvas.width = window.innerWidth;
        canvasInstance.canvas.height = window.innerHeight
    }
});

function drawParticles(number, colour) {
    for (let i = 0; i < number; i++) {
        let center = {
            x: Math.random() * canvasInstance.canvas.width,
            y: Math.random() * canvasInstance.canvas.height
        }
        canvasInstance.drawCircle(colour, center, 2);
    }
}
function animate() {
    canvasInstance.fillScreen();
    drawParticles(5000, 'grey');
    requestAnimationFrame(animate);
}

function setup() {
    animate();
}

setup();