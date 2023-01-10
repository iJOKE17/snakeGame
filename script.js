// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;
const DEFAULT_TAIL = 5;

// Variables
let canv;
let ctx;
let positionX = 10;
let positionY = 10;
let xv = 0;
let yv = 0;
let trail = [];
let tail = DEFAULT_TAIL;
let score = 0;
let cherryX = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE));
let cherryY = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE));

// Initialize the game
window.onload = function () {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  canv.width = CANVAS_WIDTH;
  canv.height = CANVAS_HEIGHT;
  document.addEventListener("keydown", handleKeyPress);
  document.getElementById("score").innerHTML = 0;
  setInterval(update, 100);
};

// Update the game state
function update() {
  positionX += xv;
  positionY += yv;

  handleCollision();
  drawField();
  drawSnake();
  drawCherry();
  checkCollision();
}

// Handle the key press events
function handleKeyPress(evt) {
  switch (evt.keyCode) {
    case 37: // left arrow key
      xv = -1;
      yv = 0;
      break;
    case 38: // up arrow key
      xv = 0;
      yv = -1;
      break;
    case 39: // right arrow key
      xv = 1;
      yv = 0;
      break;
    case 40: // down arrow key
      xv = 0;
      yv = 1;
      break;
  }
}

// Handle screen collision
function handleCollision() {
  if (positionX < 0) {
    positionX = (CANVAS_WIDTH / GRID_SIZE) - 1;
  }
  if (positionX > (CANVAS_WIDTH / GRID_SIZE) - 1) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = (CANVAS_HEIGHT / GRID_SIZE) - 1;
  }
  if (positionY > (CANVAS_HEIGHT / GRID_SIZE) - 1) {
    positionY = 0;
  }

  for (let i = 0; i < trail.length; i++) {
    if (trail[i].x === positionX && trail[i].y === positionY) {
      tail = DEFAULT_TAIL;
      score = 0;
      document.getElementById("score").innerHTML = score;
      positionX = 10;
      positionY = 10;
      trail = [];
    }
  }
}

function drawField() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * GRID_SIZE, trail[i].y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
  }
  trail.push({ x: positionX, y: positionY });
  while (trail.length > tail) {
    trail.shift();
  }
}

function drawCherry() {
  ctx.fillStyle = "red";
  ctx.fillRect(cherryX * GRID_SIZE, cherryY * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
}

function checkCollision() {
  if (positionX === cherryX && positionY === cherryY) {
    tail++;
    score++;
    document.getElementById("score").innerHTML = score;
    cherryX = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE));
    cherryY = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE));
  }
}
