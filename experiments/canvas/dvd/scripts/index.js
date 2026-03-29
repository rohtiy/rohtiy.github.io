const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let position_x = 0;
let position_y = 0;

let sizeOfElement = { width : 20, height : 20 };

let velocity_x = 5;
let velocity_y = 5;

let boundries = { start : { x : 0, y : 0 }, end : { x : (canvas.width - sizeOfElement.width) , y : (canvas.height - sizeOfElement.height) } };
console.log(boundries);
 
setInterval(() => {
 position_x  = position_x + velocity_x;
 position_y  = position_y + velocity_y;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "green" ;
ctx.fillRect(position_x, position_y , sizeOfElement.width, sizeOfElement.height);
if(position_x >= boundries.end.x || position_x <= boundries.start.x  ) {
    velocity_x = velocity_x * -1 ;
}
if(position_y >= boundries.end.y || position_y <= boundries.start.y  ) {
    velocity_y =  velocity_y * -1 ;
}
console.log("running Interval");
}, 1000/60);