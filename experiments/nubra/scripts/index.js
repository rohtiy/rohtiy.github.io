import { WindowResize, KeyListener, MyCanvas, placeInteractiveButton, removeElement } from "../../../scripts/index.js";
const controller = new AbortController();
const { signal } = controller;
const audioContext = new AudioContext();
const audioElement = document.getElementById("musicAudio"); // why did get element by tag name did not work;
const source = audioContext.createMediaElementSource(audioElement);
source.connect(audioContext.destination);

function playAudio() {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    audioElement.currentTime = 0.4;
    audioElement.play();
}

const canvasInstance = new MyCanvas({ context: '2d', size: { width: window.innerWidth, height: window.innerHeight } });
new KeyListener({ event: 'keydown', element: canvasInstance.canvas });

new WindowResize({
    callback: () => {
        setup();
    }
});


function resetMeteorPosition(meteor, delta) {
    meteor.x = Math.random() * canvasInstance.canvas.width + 100;
    meteor.y = Math.random() * 500;
    meteor.length = Math.random() * 150 + 20;
    meteor.speed = Math.random() * 9 + 10;
    // Fixed angle (~210 degrees)
    meteor.angle = Math.PI * Math.random();
    meteor.opacity = Math.random() * 0.8 + 0.2;
    meteor.time = Math.random() * 1000 + 100 + delta;
    meteor.color = { red: Math.random() * 255, green: Math.random() * 255, blue: Math.random() * 100 }
}

function getMeteorProps(meteor, delta) {
    meteor.x += Math.cos(meteor.angle) * meteor.speed;
    meteor.y += Math.sin(meteor.angle) * meteor.speed;
    if (delta > meteor.time) { meteor.opacity *= 0.9; }
    if (meteor.x < -200 || meteor.y > canvasInstance.canvas.height + 200) {
        resetMeteorPosition(meteor, delta);
    }
}

function drawMeteor(meteor) {
    canvasInstance.ctx.beginPath();
    // Define a linear gradient for the fading tail
    const gradient = canvasInstance.ctx.createLinearGradient(
        meteor.x, meteor.y,
        meteor.x - Math.cos(meteor.angle) * meteor.length,
        meteor.y - Math.sin(meteor.angle) * meteor.length
    );
    gradient.addColorStop(0, `rgba(${meteor.color.red}, ${meteor.color.green}, ${meteor.color.blue}, ${meteor.opacity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    canvasInstance.ctx.strokeStyle = gradient;
    canvasInstance.ctx.lineWidth = 2;
    canvasInstance.ctx.moveTo(meteor.x, meteor.y);
    canvasInstance.ctx.lineTo(
        meteor.x - Math.cos(meteor.angle) * meteor.length,
        meteor.y - Math.sin(meteor.angle) * meteor.length
    );
    canvasInstance.ctx.stroke();
}

function getNextFrame(delta) {
    canvasInstance.clearScreen();
    for (let i = 0; i < meteors; i++) {
        let currentMeteor = meteorMap[i];
        getMeteorProps(currentMeteor, delta);
        meteorMap[i] = currentMeteor;
        drawMeteor(currentMeteor);
    }
    requestAnimationFrame(getNextFrame);
}

function initialParticleSetup() {
    for (let i = 0; i < meteors; i++) {
        let currentMeteor = {};
        resetMeteorPosition(currentMeteor);
        meteorMap[i] = currentMeteor;
    }
}

function setup() {
    playAudio();
    canvasInstance.canvas.width = window.innerWidth;
    canvasInstance.canvas.height = window.innerHeight;
    canvasInstance.clearScreen();
    initialParticleSetup();
}


const meteors = 1;
const meteorMap = {};

placeInteractiveButton({
    id: 'startButton',
    label: 'Start',
    onClick: () => {
        removeElement({ id: 'startButton', controller });
        setup();
        getNextFrame();
        getAndDisplayMessage();
    }, options: { signal }
});