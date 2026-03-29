const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let position_x = 0;
let position_y = 0;
let sizeOfElement = { width : 20, height : 20 };
let velocity_x = Math.random() * 10;
let velocity_y = Math.random() * 10;
let bounceCount = 0;
let boundries = { start : { x : 0, y : 0 }, end : { x : (canvas.width - sizeOfElement.width) , y : (canvas.height - sizeOfElement.height) } };
let textOffSet = { x : 150, y : -50 };

function animation({ initialPositionX = 0,  initialPositionY = 0} = {}) {
    position_x = position_x + velocity_x + initialPositionX;
    position_y = position_y + velocity_y + initialPositionY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Roboto";
    ctx.fillText(`Bounce Count ${bounceCount}`, boundries.end.x - textOffSet.x , boundries.start.y - textOffSet.y);

    ctx.fillStyle = "green";
    ctx.fillRect(position_x, position_y, sizeOfElement.width, sizeOfElement.height);
    if (position_x >= boundries.end.x || position_x <= boundries.start.x) {
        velocity_x = velocity_x * -1;
        bounceCount += 1;
    }
    if (position_y >= boundries.end.y || position_y <= boundries.start.y) {
        velocity_y = velocity_y * -1;
        bounceCount += 1;
    }
    requestAnimationFrame(animation);
}

let initialPositionX = Math.floor(Math.random() * canvas.width);
let initialPositionY = Math.floor(Math.random() * canvas.height);

animation({ initialPositionX , initialPositionY});