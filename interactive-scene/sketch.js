// Interactive Scene - Snake Game
// Rayyaan Chaghtai
// 10/3/2025
//
// Extra for Experts:
// I used the mouseWheel function for checking when the player scrolls the mouse wheel and the snake's  
// speed changes accordingly. I also used the text function for writing instructions, the score, 
// and messages like START and GAME OVER on the screen but the main WOW me factor is the mouseWheel 
// function.


// declaring global variables
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

// sets up the canvas and starts new game
function setup() {
  createCanvas(400, 400);
  resetGame();
}

// draws everything on screen
function draw() {
  background(220);

  // check what game state we are in
  if (gameState === "START") {
    drawBoard();
    drawBox("Click To Start\nSnake Game");

    // instructions shown at bottom of start screen
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text("WASD OR ARROW KEYS TO MOVE", width / 2, height - 10);
  }
  else if (gameState === "PLAYING") {
    drawBoard();
    playGame(); // update and run the game
  }
  else if (gameState === "GAMEOVER") {
    drawBoard();
    drawBox("GAMEOVER!\nClick To Restart"); // show restart screen box
  }
}

// draws game border, score, and speed
function drawBoard() {
  strokeWeight(3);
  stroke(0);
  noFill();
  rect(50, 50, gridSize * cellSize, gridSize * cellSize);

  // draw score text at top
  fill(0);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  text("Score: " + score, 50, 20);

  // show speed with label 
  let speedLabel = "";
  if (speed <= 10) {
    speedLabel = "Slow";
  }
  else if (speed <= 20) {
    speedLabel = "Normal";
  }
  else {
    speedLabel = "Fast";
  }

  // show speed and scroll instruction
  text("Speed: " + speedLabel, 120, 20);
  text("Scroll to Adjust Speed", 220, 20);
}

// draws a button with message in center
function drawBox(message) {
  fill(180);
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - 100, height / 2 - 50, 200, 100, 20);

  // button text
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(message, width / 2, height / 2);
}

// main game - updates snake and food
function playGame() {

  // counter controls how fast snake moves
  counter++;

  if (counter >= max(1, 30 - speed)) {
    counter = 0;
    moveSnake();
  }

  // draw food
  fill(255, 0, 0);
  rect(50 + foodX * cellSize, 50 + foodY * cellSize, cellSize, cellSize);

  // draw snake
  fill(0, 200, 0);
  for (let i = 0; i < snakeLength; i++) {
    rect(50 + snakeX[i] * cellSize, 50 + snakeY[i] * cellSize, cellSize, cellSize);
  }
}

// place food randomly and avoids snake's body
function placeFood() {
  let fx, fy;
  let safe = false;

  // loop until safe food spot found
  while (safe === false) {
    fx = floor(random(gridSize));
    fy = floor(random(gridSize));
    safe = checkSafe(fx, fy);
  }

  // set food position
  foodX = fx;
  foodY = fy;
}

// check if food spawn is safe
function checkSafe(x, y) {
  for (let i = 0; i < snakeLength; i++) {
    if (snakeX[i] === x && snakeY[i] === y) {
      return false;
    }
  }
  return true;
}

// moves snake forward and checks collisons
function moveSnake() {
  let tailX = snakeX[snakeLength - 1];
  let tailY = snakeY[snakeLength - 1];

  // updates current direction to next one
  direction = nextDirection;

  // move body forward
  for (let i = snakeLength - 1; i > 0; i--) {
    snakeX[i] = snakeX[i - 1];
    snakeY[i] = snakeY[i - 1];
  }

  // move head based on direction
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

  // check if head eats food
  if (snakeX[0] === foodX && snakeY[0] === foodY) {
    score = score + 1;
    grow = true;
    placeFood();
  }

  // grow snake by adding tail piece
  if (grow === true) {
    snakeX[snakeLength] = tailX;
    snakeY[snakeLength] = tailY;
    snakeLength++;
    grow = false;
  }

  // check wall collision
  if (snakeX[0] < 0 || snakeX[0] >= gridSize || snakeY[0] < 0 || snakeY[0] >= gridSize) {
    gameState = "GAMEOVER";
  }

  // check self collision
  for (let i = 1; i < snakeLength; i++) {
    if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
      gameState = "GAMEOVER";
    }
  }
}

// work with clicking start/restart button
function mousePressed() {
  if (gameState === "START") {
    if (insideBox(mouseX, mouseY)) {
      resetGame();
      gameState = "PLAYING";
    }
  }

  // check if button clicked on game over screen
  else if (gameState === "GAMEOVER") {
    if (insideBox(mouseX, mouseY)) {
      resetGame();
      gameState = "PLAYING";
    }
  }
}

// checks if mouse clicked is inside the box
function insideBox(mx, my) {
  // define box position and size
  let boxX = 100;
  let boxY = 150;
  let boxW = 200;
  let boxH = 100;

  // check if mouse is inside those bounds
  return (mx > boxX && mx < boxX + boxW && my > boxY && my < boxY + boxH);
}

// works with key presses to change the direction
function keyPressed() {
  // up movement
  if ((keyCode === UP_ARROW || key === "w" || key === "W") && direction !== "DOWN") {
    nextDirection = "UP";
  }

  // down movement
  else if ((keyCode === DOWN_ARROW || key === "s" || key === "S") && direction !== "UP") {
    nextDirection = "DOWN";
  }

  // left movement
  else if ((keyCode === LEFT_ARROW || key === "a" || key === "A") && direction !== "RIGHT") {
    nextDirection = "LEFT";
  }

  // right movement
  else if ((keyCode === RIGHT_ARROW || key === "d" || key === "D") && direction !== "LEFT") {
    nextDirection = "RIGHT";
  }
}

// scrolls mouse wheel to change speed
function mouseWheel(event) {
  // scrolling up increases speed
  if (event.delta < 0) {
    speed++;
    if (speed > 30) {
      speed = 30;
    }
  }

  // scrolling down increases speed
  else if (event.delta > 0) {
    speed--;
    if (speed < 1) {
      speed = 1;
    }
  }
  return false;
}

// resets snake, score, and food position
function resetGame() {
  snakeX = [5];
  snakeY = [5];
  snakeLength = 1;
  direction = "RIGHT";
  nextDirection = "RIGHT";
  score = 0;
  counter = 0;
  grow = false;

  // places first food
  placeFood();
}