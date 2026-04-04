import { WindowResize, KeyListener, sendVibration, placeInteractiveButton, removeElement } from "../../../scripts/index.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const controller = new AbortController();
const { signal } = controller;
let audioTimeOut = null;

const audioContext = new AudioContext();
const audioElement = document.getElementById("musicAudio"); // why did get element by tag name did not work;
const source = audioContext.createMediaElementSource(audioElement);
source.connect(audioContext.destination);

function pauseAudio() {
    audioElement.pause();
    audioElement.currentTime = 0.4;
}

function playAudio() {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    audioElement.currentTime = 0.4;
    audioElement.play();
    clearTimeout(audioTimeOut);
    audioTimeOut = setTimeout(pauseAudio, 300);
}

let position_x = 0;
let position_y = 0;
let sizeOfElement = { width: 20, height: 20 };
let velocity_x = Math.random() * 10;
let velocity_y = Math.random() * 10;
let bounceCount = 0;
let boundaries = getBoundaries();
let textOffSet = { x: 150, y: -50 };


new KeyListener({ element: canvas });

new WindowResize({
    callback: () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        boundaries = getBoundaries();
    }
});

function getBoundaries() {
    return { start: { x: 0, y: 0 }, end: { x: (canvas.width - sizeOfElement.width), y: (canvas.height - sizeOfElement.height) } };
}

function animation({ initialPositionX = 0, initialPositionY = 0 } = {}) {
    position_x = position_x + velocity_x + initialPositionX;
    position_y = position_y + velocity_y + initialPositionY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Roboto";
    ctx.fillText(`Bounce Count ${bounceCount}`, boundaries.end.x - textOffSet.x, boundaries.start.y - textOffSet.y);

    ctx.fillStyle = "green";
    ctx.fillRect(position_x, position_y, sizeOfElement.width, sizeOfElement.height);
    if (position_x >= boundaries.end.x || position_x <= boundaries.start.x) {
        velocity_x = velocity_x * -1;
        bounceCount += 1;
        sendVibration(100);
        playAudio();
    }
    if (position_y >= boundaries.end.y || position_y <= boundaries.start.y) {
        velocity_y = velocity_y * -1;
        bounceCount += 1;
        sendVibration(100);
        playAudio();
    }
    requestAnimationFrame(animation);
}

let initialPositionX = Math.floor(Math.random() * canvas.width);
let initialPositionY = Math.floor(Math.random() * canvas.height);


placeInteractiveButton({
    id: 'startButton',
    label: 'Start',
    onClick: () => {
        animation({ initialPositionX, initialPositionY });
        removeElement({ id: 'startButton', controller });
    }, options: { signal }
});
