import { WindowResize, KeyListener, MyCanvas } from "../../../scripts/index.js";

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

    console.log(delta);

    if (delta > messageDelay && !messageFetched) {
        messageFetched = true;
        getAndDisplayMessage();
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
    canvasInstance.canvas.width = window.innerWidth;
    canvasInstance.canvas.height = window.innerHeight;
    canvasInstance.clearScreen();
    initialParticleSetup();
}

async function getAndDisplayMessage() {
    const url = window.APP_CONFIG.APP_URL + "/nubra";

    const params = { method: 'GET' };

    let finalResponse;
    try {
        let response = await fetch(url, params);
        finalResponse = await response.json();
    } catch (error) {
        console.error("Error fetching message:", error);
        return;
    }

    if (!finalResponse?.title) {
        return;
    }

    document.title = finalResponse.title;

    let title = document.createElement('h1');
    let messageDiv = document.createElement('div');

    title.innerText = finalResponse.title;
    title.style.position = 'absolute';
    title.style.top = '100px';
    title.style.left = '50%';
    title.style.transform = 'translateX(-50%)';
    title.style.color = 'white';
    title.style.textAlign = 'center';

    title.style.opacity = '0';
    title.style.transition = 'opacity 1s ease-in-out';

    messageDiv.innerText = '';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '200px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.color = 'white';
    messageDiv.style.textAlign = 'center';

    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '200px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.color = 'white';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.width = '80%'; // Prevent it from stretching edge-to-edge
    messageDiv.style.maxWidth = '600px';

    // 2. Make it scrollable and constrain its height so it fits on screen
    messageDiv.style.overflowY = 'auto';
    messageDiv.style.maxHeight = 'calc(100vh - 250px)'; // 100vh is full screen height, minus 250px for the top spacing
    // 3. Apply the hidden scrollbar class
    messageDiv.classList.add('no-scrollbar');

    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 1s ease-in-out 2s';

    const paragraphs = finalResponse.message.split('\n');

    paragraphs.forEach(text => {
        let p = document.createElement('p');
        p.innerText = text;
        p.style.marginBottom = '15px';
        p.style.lineHeight = '1.6';
        messageDiv.appendChild(p);
    });

    document.body.appendChild(title);
    document.body.appendChild(messageDiv);

    requestAnimationFrame(() => {
        title.style.opacity = '1';
        messageDiv.style.opacity = '1';
    });
}

const meteors = 1;
const meteorMap = {};
let messageFetched = false;
const messageDelay = 3 * 1000;


setup();
getNextFrame();