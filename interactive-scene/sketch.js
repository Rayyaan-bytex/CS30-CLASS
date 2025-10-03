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
let grow = false;

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

  if (direction === "UP") {
    snakeY[0]--;
  }
  else if (direction === "DOWN") {
    snakeY++;
  }
  else if (direction === "LEFT") {
    snakeX[0]--;
  }
  else if (direction === "RIGHT") {
    snakeX[0]++;
  }

  if (snakeX[0] === foodX && snakeY[0] === foodY) {
    score++;
    grow = true;
    placeFood();
  }

  if (snakeX[0] < 0 || snakeX[0] >= gridSize || snakeY[0] < 0 || snakeY[0] >= gridSize) {
    gameState = "GAMEOVER";
  }

  for (let i = 1; i < snakeLength; i++) {
    if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
      gameState = "GAMEOVER";
    }
  }
}

function mousePressed() {
  if (gameState === "START" || gameState === "GAMEOVER") {
    resetGame();
    gameState = "PLAYING"
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || key === "w") {
    nextDirection = "UP";
  }
  else if (keyCode === DOWN_ARROW || key === "s") {
    nextDirection = "DOWN";
  }
  else if (keyCode === LEFT_ARROW || key === "a") {
    nextDirection = "LEFT";
  }
  else if (keyCode === RIGHT_ARROW || key === "d") {
    nextDirection = "RIGHT";
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    speed++;
  }
  else if (event.delta > 0) {
    speed = max(1, speed - 1);
  }
}

function resetGame() {
  snakeX = [5];
  snakeY = [5];
  snakeLength = 1;
  direction = "RIGHT";
  score = 0;
  placeFood();
}