const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let playerPosition = { x: 100, y: 900 };
let ballPosition = { x: 0, y: 0 };
let ballVelocity = {
  x: Math.floor(Math.random() * 10),
  y: Math.floor(Math.random() * 10)
};
let ballSize = { width: 50, height: 50 };
let velocity = { x: 10 };
let textOffSet = { x: 200, y: -100 };
let sizeOfElement = { width: 200, height: 50 };
let score = 0;
let boundries = { start: { x: 0, y: 0 }, end: { x: (canvas.width), y: (canvas.height) } };
let isGameOver = false;

function drawRectange(color = "blue", position = { x: 0, y: 0 }, size = { width: 200, height: 50 }) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, size.width, size.height);
}

function clearPage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function boundaryCheck() {
  if (playerPosition.x >= boundries.end.x || playerPosition.x <= boundries.start.x) {
    velocity.x = velocity.x * -1;
  }
}

function restartGame() {
  if (isGameOver) {
    isGameOver = false;
    ballVelocity = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
    animate();
  }
}

function onClickListner() {
  restartGame();
}

function moveLeft() {
  playerPosition.x = playerPosition.x - 60;
  velocity.x = 0;
}

function moveRight() {
  playerPosition.x = playerPosition.x + 60;
  velocity.x = 0;
}

function onKeyPressUpdate(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "s":
    case "S":
      increaseBallVelocity(0.1);
      break;
    case " ":
      restartGame();
    default:
      break;
  }
}

function updatePosition() {
  playerPosition = { x: playerPosition.x + velocity.x, y: playerPosition.y };
}

function createGameBlocks() {
  for (let row = 0; row < canvas.width; row = row + sizeOfElement.width) {
    for (let column = 0; column < canvas.height / 2; column = row + sizeOfElement.height) {
      ctx.fillRect(row, column, sizeOfElement.width, sizeOfElement.height);
    }
  }
}

function renderScore() {
  let position = {
    x: boundries.end.x - textOffSet.x,
    y: boundries.start.y - textOffSet.y
  }
  renderText(`Score ${score}`, position);
}

function increaseBallVelocity(factor = 0.1) {
  ballVelocity = {
    x: ballVelocity.x * (1 + factor),
    y: ballVelocity.y * (1 + factor)
  }
}

function renderText(message, position = { x: (canvas.width / 2), y: (canvas.height / 2) }) {
  ctx.font = "48px Roboto";
  ctx.fillText(message, position.x, position.y);
}

function gameOver() {
  ballPosition = { x: 0, y: 0 };
  isGameOver = true;
}

function showGameOver() {
  renderText(`Game Over, Final Score : ${score}`, { x: 210, y: 500 });
}


function checkGameAreaBoundry() {
  if (ballPosition.x >= boundries.end.x - ballSize.width || ballPosition.x <= boundries.start.x) {
    ballVelocity.x = ballVelocity.x * -1;
  }
  if (ballPosition.y <= boundries.start.y) {
    ballVelocity.y = ballVelocity.y * -1;
  }
  if (ballPosition.y >= boundries.end.y) {
    //ballVelocity.y = ballVelocity.y * -1;
    return gameOver();
  }
}

function checkCollisionWithPlayer() {
  if (
    (ballPosition.y + ballSize.height >= playerPosition.y) &&
    ((ballPosition.x >= playerPosition.x) && (ballPosition.x + ballSize.width <= playerPosition.x + sizeOfElement.width))
  ) {
    ballVelocity.y = Math.min(ballVelocity.y, 20) * -1;
    score += 1;
    increaseBallVelocity(0.05);
  }
}

function handleBallBoundries() {
  checkGameAreaBoundry();
  checkCollisionWithPlayer();
}

function renderBall() {
  ballPosition = {
    x: ballPosition.x + ballVelocity.x,
    y: ballPosition.y + ballVelocity.y,
  }
  drawRectange("green", ballPosition, ballSize);
  handleBallBoundries();
}

function renderPlayer() {
  updatePosition();
  boundaryCheck();
  drawRectange("red", playerPosition, sizeOfElement);
}

function animate() {
  clearPage();
  if (isGameOver) {
    showGameOver();
    return
  };
  renderScore();
  //createGameBlocks();
  renderBall();
  renderPlayer();
  requestAnimationFrame(animate);
}

function initialCode() {
  animate();
  document.addEventListener("keydown", onKeyPressUpdate);
  addEventListener("click", onClickListner);
  handleClick();
}

initialCode();