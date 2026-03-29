let canvas;
let ctx;
let touch;

function getRandomIntegerInRange(range) {
    return Math.floor(Math.random() * range);
}

function getCanvas() {
    canvas = document.getElementById("drawingCanvas");
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        return canvas;
    }

    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    return canvas;
}

function getContext() {
    ctx = canvas.getContext("2d");
    return ctx;
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRectangle(color = "blue", position = { x: 0, y: 0 }, size = { width: 200, height: 50 }) {
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size.width, size.height);
}

function drawCircle(color, center, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI * 2, false);
    ctx.fill();
}

function onScreenResize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    draw();
}

function onOverlayClick(event) {
    eraseWithEvent(event);
}

function onOverlayDrag(event){
    console.log(event);
}

function onOverlayTouchStart(event) {
    let item = event.changedTouches?.[0];
    touch = {};
    item.clientX;
    item.clientY;
    touch.start = { x: item.clientX, y: item.clientY };
}

function onOverlayTouchEnd(event) {
    let item = event.changedTouches?.[0];
    item.clientX;
    item.clientY;
    touch.end = { x: item.clientX, y: item.clientY };
    touch.size = { x: item.radiusX, y: item.radiusY };
    eraseTouch();
}

function eraseTouch() {
    ctx.beginPath();
    ctx.strokeStyle ="#133d4f";
    ctx.moveTo(touch?.start?.x, touch?.start?.y);
    ctx.lineTo(touch?.end?.x,  touch?.end?.y);
    ctx.lineWidth = 50;
    ctx.stroke();
}

function onCanvasClick(event) {
    eraseWithEvent(event);
}

function eraseWithEvent(event) {
    let position = { x: event.clientX, y: event.clientY }
    eraseCircle(position, 50);
}

function eraseCircle(position, size) {
    let colour = "#133d4f";
    drawCircle(colour, position, size);
}

function addScreenResizeListner() {
    window.addEventListener("resize", onScreenResize);
}

function addClickListner() {
    let overlay = document.getElementById("overlay");
    overlay.addEventListener("click", onOverlayClick);
    overlay.addEventListener("drag", onOverlayDrag);
    overlay.addEventListener("touchstart", onOverlayTouchStart);
    overlay.addEventListener("touchend", onOverlayTouchEnd);
}

function generateParticalAtRandomPosition() {
    let center = {
        x: getRandomIntegerInRange(canvas.width),
        y: getRandomIntegerInRange(canvas.height)
    }
    let radius = getRandomIntegerInRange(10);
    let colour = `rgb(${getRandomIntegerInRange(255)}, ${getRandomIntegerInRange(150)}, ${getRandomIntegerInRange(50)})`;
    drawCircle(colour, center, radius);
}

function draw() {
    let colour = "#133d4f";
    drawRectangle(colour, { x: 0, y: 0 }, { width: canvas.width, height: canvas.height });
}

function animate() {
    generateParticalAtRandomPosition();
    requestAnimationFrame(animate);
}

function restart() {
    clearScreen();
}

function initialCode() {
    getCanvas();
    getContext();
    clearScreen();
    addScreenResizeListner();
    addClickListner();
    draw();
    animate();
}

initialCode();