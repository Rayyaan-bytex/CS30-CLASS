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
let foodX;
let foodY;
let direction = "RIGHT";
let nextDirection = "RIGHT";
let grow = false;


function setup() {
  createCanvas(400, 400);
  resetGame();
}

function draw() {
  background(220);

  if (gameState === "START") {
    drawBoard();

    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Click To Start Snake Game", width / 2, height / 2);
  }
  else if (gameState === "PLAYING") {
    drawBoard();
    playGame();
  }
  else if (gameState === "GAMEOVER") {
    drawBoard();

    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("GAMEOVER! Click to Restart", width / 2, height / 2);
  }
}

function drawBoard() {
  stroke(0);
  noFill();
  rect(50, 50, gridSize * cellSize, gridSize * cellSize);

  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("Speed: " + speed, 50, 20);
  text("Score: " + score, 150, 20);
}

function playGame() {
  counter = counter + 1;

  if (counter >= max(1, 30 - speed)) {
    counter = 0;
    moveSnake();
  }

  // draw food
  fill(255, 0, 0);
  rect(50 + foodX * cellSize, 50 + foodY * cellSize, cellSize, cellSize);

  // draw snake
  fill(0, 200, 0);
  for (let i = 0; i < snakeLength; i = i + 1) {
    rect(50 + snakeX[i] * cellSize, 50 + snakeY[i] * cellSize, cellSize, cellSize);
  }
}

function placeFood() {
  let safe = false;

  while (!safe) {
    let fx = floor(random(gridSize));
    let fy = floor(random(gridSize));

    safe = true;
    for (let i = 0; i < snakeLength; i++) {
      if (snakeX[i] === fx && snakeY[i] === fy) {
        safe = false;
      }
    }

    if (safe) {
      foodX = fx;
      foodY = fy;
    }
  }
}


function moveSnake() {
  // remember old tail
  let tailX = snakeX[snakeLength - 1];
  let tailY = snakeY[snakeLength - 1];

  direction = nextDirection;

  // move body
  for (let i = snakeLength - 1; i > 0; i = i - 1) {
    snakeX[i] = snakeX[i - 1];
    snakeY[i] = snakeY[i - 1];
  }

  // move head
  if (direction === "UP") {
    snakeY[0] = snakeY[0] - 1;
  }
  else if (direction === "DOWN") {
    snakeY[0] = snakeY[0] + 1;
  }
  else if (direction === "LEFT") {
    snakeX[0] = snakeX[0] - 1;
  }
  else if (direction === "RIGHT") {
    snakeX[0] = snakeX[0] + 1;
  }

  // check eat food
  if (snakeX[0] === foodX && snakeY[0] === foodY) {
    score = score + 1;
    grow = true;
    placeFood();
  }

  // grow snake
  if (grow === true) {
    snakeX[snakeLength] = tailX;
    snakeY[snakeLength] = tailY;
    snakeLength = snakeLength + 1;
    grow = false;
  }

  // wall collision
  if (snakeX[0] < 0) {
    gameState = "GAMEOVER";
  }
  else if (snakeX[0] >= gridSize) {
    gameState = "GAMEOVER";
  }
  else if (snakeY[0] < 0) {
    gameState = "GAMEOVER";
  }
  else if (snakeY[0] >= gridSize) {
    gameState = "GAMEOVER";
  }

  // self collision
  for (let i = 1; i < snakeLength; i = i + 1) {
    if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
      gameState = "GAMEOVER";
    }
  }
}

function mousePressed() {
  if (gameState === "START" || gameState === "GAMEOVER") {
    resetGame();
    gameState = "PLAYING";
  }
}

function keyPressed() {
  if ((keyCode === UP_ARROW || key === "w" || key === "W") && direction !== "DOWN") {
    nextDirection = "UP";
  }
  else if ((keyCode === DOWN_ARROW || key === "s" || key === "S") && direction !== "UP") {
    nextDirection = "DOWN";
  }
  else if ((keyCode === LEFT_ARROW || key === "a" || key === "A") && direction !== "RIGHT") {
    nextDirection = "LEFT";
  }
  else if ((keyCode === RIGHT_ARROW || key === "d" || key === "D") && direction !== "LEFT") {
    nextDirection = "RIGHT";
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    speed = speed + 1;
    if (speed > 30) {
      speed = 30;
    }
  }
  else if (event.delta > 0) {
    speed = speed - 1;
    if (speed < 1) {
      speed = 1;
    }
  }
  return false;
}

function resetGame() {
  snakeX = [5];
  snakeY = [5];
  snakeLength = 1;
  direction = "RIGHT";
  nextDirection = "RIGHT";
  score = 0;
  counter = 0;
  grow = false;
  placeFood();
}
