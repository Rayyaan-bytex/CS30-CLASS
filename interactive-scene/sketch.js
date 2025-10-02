// Interactive Scene
// Rayyaan Chaghtai
// 9/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cellSize = 25;
let gridSize = 12;
let gameState = "START";
let speed = 5;
let score = 0;
let counter = 0;
let snakeX = [];
let snakeY = [];
let snakeLength = 1;
let foodX, foodY;
let direction = "RIGHT";
let nextDirection = "RIGHT";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  if (gameState === "START") {
    snakeGrid();
    // fill("white");
    // rect(50 , 75, width/2, height/2);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click To Start Snake Game", width / 2, height / 2);
  }
  else if (gameState === "PLAYING") {
    snakeGrid();
  }
  else if (gameState === "GAME OVER") {
    snakeGrid();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("GAME OVER! Click to Restart", width / 2, height / 2);
  }
}


function snakeGrid() {
  noStroke();
  noFill();
  rect(50, 50, gridSize * cellSize, gridSize * cellSize);
}

fill(0);
textSize(14);
textAlign(LEFT, TOP);
text("Speed: ", + speed, 50, 20);
text("Score: ", + score, 150, 20);

function playGame() {
  counter++;
  if (counter >= max(1, 30 - speed)) {
    counter = 0;
    moveSnake();
  }

  fill(255, 0, 0);
  rect(50 + foodX * cellSize, 50 + foodY * cellSize, cellSize, cellSize);

  fill(0, 255, 0);
  for (let i = 0; i < snakeLength; i++) {
    rect(50 + snakeX[i] * cellSize, 50 + snakeY[i] * cellSize, cellSize, cellSize);
  }
}

function placeFood() {
  foodX = floor(random(gridSize));
  foodY = floor(random(gridSize));
}

function moveSnake() {
  direction = nextDirection;
  for (let i = snakeLength - 1; i > 0; i--) {
    snakeX[i] = snakeX[i - 1];
    snakeY[i] = snakeY[i - 1];
  }
}