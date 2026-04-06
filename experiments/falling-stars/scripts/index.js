import { WindowResize, KeyListener, MyCanvas } from "../../../scripts/index.js";

const canvasInstance = new MyCanvas({ context: '2d', size: { width: window.innerWidth, height: window.innerHeight } });
new KeyListener({ event: 'keydown', element: canvasInstance.canvas });

new WindowResize({
    callback: () => { setup(); }
});


const initialParticles = {
    layerOne: {
        color: 'white',
        particles: [],
        count: 100,
        radius: 3,
        speed: 8,
    },
    layerTwo: {
        color: 'white',
        particles: [],
        count: 100,
        radius: 2,
        speed: 5,
    },
    layerThree: {
        color: 'white',
        particles: [],
        count: 100,
        radius: 1,
        speed: 2,
    }
}

function drawParticles(number, colour) {
    for (let i = 0; i < number; i++) {
        let center = {
            x: Math.random() * canvasInstance.canvas.width,
            y: Math.random() * canvasInstance.canvas.height
        }
        canvasInstance.drawCircle(colour, center, 2);
    }
}

function getRandomPositionOnCanvas() {
    return {
        x: Math.random() * canvasInstance.canvas.width,
        y: Math.random() * canvasInstance.canvas.height
    }
}


function getNextFrame() {
    canvasInstance.fillScreen('black');
    for (let layerKey in initialParticles) {
        const { particles, count, radius, speed, color } = initialParticles[layerKey];
        for (let i = 0; i < count; i++) {
            particles[i] = {
                x: particles[i].x,
                y: (particles[i].y + speed) > canvasInstance.canvas.height ? 0 : particles[i].y + speed,
            }
            canvasInstance.drawCircle(color, particles[i], radius);
        }
    }
    requestAnimationFrame(getNextFrame);
}


function initialParticleSetup() {
    for (let layerKey in initialParticles) {
        const { particles, count } = initialParticles[layerKey];
        for (let i = 0; i < count; i++) {
            let particle = getRandomPositionOnCanvas();
            particles.push(particle);
        }
    }
}

function setup() {
    canvasInstance.canvas.width = window.innerWidth;
    canvasInstance.canvas.height = window.innerHeight;
    canvasInstance.fillScreen('black');
    initialParticleSetup();
}

setup();
getNextFrame();