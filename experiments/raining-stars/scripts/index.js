import { WindowResize, KeyListener, MyCanvas } from "../../../scripts/index.js";
import { getRandomPositionOnCanvas } from "../../../scripts/utils/index.js";

const canvasInstance = new MyCanvas({ context: '2d', size: { width: window.innerWidth, height: window.innerHeight } });
new KeyListener({ event: 'keydown', element: canvasInstance.canvas });

let particleColor = 'white';
let backgroundColor = 'black';

canvasInstance.canvas.style.background = backgroundColor;

new WindowResize({
    callback: () => { setup(); }
});


const initialParticles = {
    layerOne: {
        color: particleColor,
        particles: [],
        count: 50,
        radius: 3,
        speed: 5,
    },
    layerTwo: {
        color: particleColor,
        particles: [],
        count: 50,
        radius: 2,
        speed: 3,
    },
    layerThree: {
        color: particleColor,
        particles: [],
        count: 50,
        radius: 1,
        speed: 1,
    }
}


function getNextFrame() {
    canvasInstance.clearScreen();
    for (let layerKey in initialParticles) {
        const { particles, count, radius, speed, color } = initialParticles[layerKey];
        for (let i = 0; i < count; i++) {
            particles[i] = {
                x: particles[i].x,
                y: (particles[i].y + speed) > canvasInstance.canvas.height ? 0 : particles[i].y + speed,
            }
            //canvasInstance.drawCircle(color, particles[i], radius);
            canvasInstance.fillText('⭐️', particles[i], radius * 10);
        }
    }
    requestAnimationFrame(getNextFrame);
}


function initialParticleSetup() {
    for (let layerKey in initialParticles) {
        const { particles, count } = initialParticles[layerKey];
        particles.length = 0;
        for (let i = 0; i < count; i++) {
            let particle = getRandomPositionOnCanvas(canvasInstance.canvas);
            particles.push(particle);
        }
    }
}

function setup() {
    canvasInstance.canvas.width = window.innerWidth;
    canvasInstance.canvas.height = window.innerHeight;
    canvasInstance.clearScreen();
    initialParticleSetup();
}

setup();
getNextFrame();