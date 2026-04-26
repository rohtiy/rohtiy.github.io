import { WindowResize, KeyListener, MyCanvas } from "../../../scripts/index.js";
import { getRandomPositionOnCanvas } from "../../../scripts/utils/index.js";

const canvasInstance = new MyCanvas({ context: '2d', size: { width: window.innerWidth, height: window.innerHeight } });
new KeyListener({ event: 'keydown', element: canvasInstance.canvas });

let particleColor = 'red';
let backgroundColor = 'white';

canvasInstance.canvas.style.background = backgroundColor;

new WindowResize({
    callback: () => { setup(); }
});

const ball = {
    position: { x: 500, y: 30 },
    color: particleColor,
    radius: 40,
    velocity: { x: 0, y: 0 },
    elasticity: 0.2
}

let timeOffset = 0;
const g = 9.8;

function setBallPosition(time) {
    if (Math.abs(ball.velocity.y) < 1 && !time) { return; };
    const timeToConsider = time - timeOffset;
    console.log('Ball Velocity', ball.velocity.y);
    const nextPosition = (ball.velocity.y) + (0.5 * g);
    const currentVelocity = ball.velocity.y + g * timeToConsider;
    ball.position.y = ball.position.y + nextPosition;
    ball.velocity.y = currentVelocity;
    if (ball.position.y >= canvasInstance.canvas.height) {
        ball.position.y = canvasInstance.canvas.height - (2 * ball.radius);
        ball.velocity.y = - ball.velocity.y * ball.elasticity;
        timeOffset = time;
    }
}

function drawBall(time) {
    setBallPosition(time);
    canvasInstance.drawCircle(ball.color, ball.position, ball.radius);
}

function getNextFrame(time = 0) {
    canvasInstance.clearScreen();
    drawBall(time);
    setTimeout(() => getNextFrame(time + 1), 100)
}


function initialParticleSetup() {

}

function setup() {
    canvasInstance.canvas.width = window.innerWidth;
    canvasInstance.canvas.height = window.innerHeight;
    canvasInstance.clearScreen();
    initialParticleSetup();
}

setup();
getNextFrame();