let canvas;
let ctx;

function getCanvas() {
    canvas = document.getElementById("drawingCanvas");
    if(canvas) {
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
    ctx.clearRect(0,0, canvas.width, canvas.height);
}


function drawRectangle(color = "blue", position = { x: 0, y: 0 }, size = { width: 200, height: 50 }) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, size.width, size.height);
}

function onScreenResize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    draw();
}

function addScreenResizeListner(){
    window.addEventListener("resize", onScreenResize);
}

function generateParticalAtRandomPosition(){
    let center = { 
        x : Math.floor(Math.random() * canvas.width),
        y : Math.floor(Math.random() * canvas.height),
    }
    let radius = 5;
    drawCircle("white", center, radius);
}

function draw() {
    let colour = "#133d4f";
    drawRectangle(colour, {x : 0, y: 0}, { width : canvas.width , height : canvas.height });
}

function drawCircle(color, center, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, Math.PI*2, false);
    ctx.fill();
}

function animate() {
    generateParticalAtRandomPosition();
    requestAnimationFrame(animate);
}

function initialCode() {
    getCanvas();
    getContext();
    clearScreen();
    addScreenResizeListner();
    draw();
    animate();
}

initialCode();