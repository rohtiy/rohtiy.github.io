

  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  function drawEmoji(x = 0,y = 0, size = 100) {
    ctx.beginPath();
    ctx.fillStyle = "#fa0";
    ctx.arc(x + 100, y + 100, size, 0, (Math.PI)*2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc((size/2) + x, (3*size/4) + y, size/10, 0, (Math.PI) * 2, false);
    ctx.arc((2*size - size/2) +x,3*size/4 + y, size/10, 0, (Math.PI) * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(size+x,size+y, 3*size/4, 0, (Math.PI), false);
    ctx.fill();
  }

 function drawRectange( color, position, size) {
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size.x, size.y);
 }

 function drawTriangle() {
   ctx.beginPath();
   ctx.fillStyle = "green";
   ctx.moveTo(500, 100);
   ctx.lineTo(600, 300);
   ctx.lineTo(400, 300);
   ctx.fill();
 }

 function drawCircle(x = 0 , y = 0) {
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.arc(x + 100, y + 100, 100, 0, (Math.PI)*2, false);
  ctx.fill();
 }

 function drawTrapzium() {
   ctx.beginPath();
   ctx.fillStyle = "blue";
   ctx.moveTo(400, 600);
   ctx.lineTo(600, 600);
   ctx.lineTo(700, 1000);
   ctx.lineTo(500, 1000);
   ctx.lineTo(300, 1000);
   ctx.fill();
 }

  function clearPage() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    clearPage();
    drawCircle(400, 425);
    drawEmoji(400, 250, 100);
    drawTriangle();
    drawTrapzium();
    drawRectange("red", { x : 0, y : 300 }, { x : 100 , y : 100 });
    drawRectange("blue", { x : 900, y : 300 }, { x : 100 , y : 100 });
  }

  draw();