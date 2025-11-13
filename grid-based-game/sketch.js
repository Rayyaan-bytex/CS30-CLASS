// Grid-Based Game  -  Tetris Game
// Rayyaan Chaghtai
// November 12, 2025
//
// Extra for Experts:
// - Used unshift() to make the filled rows disappear and the blocks above move below to the next row


let gameState = "START";   
let cellSize = 40;         
let cols = 10;             
let rows;                  
let currentPiece;          
let pieceX;                
let pieceY;                
let fallTimer = 0;         // counts frames before shape moves down
let fallSpeed = 30;        // how fast the shape falls
let board;                 
let startButton;           

// Tetrominoes
const T = [
  [1, 1, 1],
  [0, 1, 0]
];

const O = [
  [1, 1],
  [1, 1]
];

const I = [
  [1, 1, 1, 1]
];

const L = [
  [1, 0],
  [1, 0],
  [1, 1]
];

const S = [
  [0, 1, 1],
  [1, 1, 0]
];

// Array of all shapes and their colors
const TETROMINOES = [T, O, I, L, S];
const COLORS = ["purple", "yellow", "cyan", "orange", "green"];


function setup() {
  createCanvas(500, 500);
  rows = floor(windowHeight / cellSize);
  board = [];

  // Outer loop makes rows, inner loop fills each cell with null (empty)
  for (let y = 0; y < rows; y++) {
    let boardRow = [];
    for (let x = 0; x < cols; x++) {
      boardRow.push(null);    // means this grid spot has no color or block yet
    }
    board.push(boardRow);
  }

  createStartButton();
}


// Start Button 
function createStartButton() {
  startButton = createButton("START GAME");
  startButton.style("background-color", "yellow");
  startButton.style("font-size", "16px");
  startButton.style("font-weight", "bold");
  startButton.style("border-radius", "10px");
  startButton.style("padding", "10px 20px");
  startButton.style("cursor", "pointer");
  startButton.position(width / 2 - 72, height / 2 + 100);
  startButton.mousePressed(startGame);
}


// Starts the game
function startGame() {
  startButton.hide();
  gameState = "PLAY";
  spawnNewShape();   // create the first falling piece
}


// Main draw loop
function draw() {
  background('#56bbe4ff');

  if (gameState === "START") {
    drawStartScreen();
  }

  else if (gameState === "PLAY") {
    resizeCanvas(400, windowHeight);
    background('#535364ff');
    drawGame();

    // Makes the piece fall every few frames using a timer
    if (currentPiece) {
      fallTimer++;
      if (fallTimer > fallSpeed) {
        if (atBottom()) {
          savePiece();       // save the shape into the board
          spawnNewShape();   // make a new one
        } 
        else {
          pieceY++;          // move the shape down
        }
        fallTimer = 0;
      }
      drawPiece(currentPiece, pieceX, pieceY);  // draw the current falling shape
    }
  }

  else if (gameState === "GAMEOVER") {
    drawGameOverScreen();
  }
}


// Start screen instructions
function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(36);
  textStyle(BOLD);
  text("🟥Tetris Game🟥", width / 2, height / 2 - 120);

  textSize(25);
  text("⬇️Click The Button Below To Start⬇️", width / 2, height / 2 - 60);
  textSize(25);
  text("INSTRUCTIONS", width / 2, height / 2 - 10);

  textSize(16);
  text("• Rotate Falling Shapes To Fit Them Into A Grid\n• Prevent The Stack From Reaching The Top\n• Complete Solid Horizontal Lines To Clear Them!", width / 2, height / 2 + 45);
}


// Game Over Screen
function drawGameOverScreen() {
  background("#222");
  textAlign(CENTER, CENTER);
  fill("red");
  textSize(40);
  text("GAME OVER!", width / 2, height / 2 - 50);
  fill("white");
  textSize(18);
  text("Refresh the page to restart.", width / 2, height / 2 + 50);
}


// Draws the grid and any blocks that have landed
function drawGame() {
  noFill();
  strokeWeight(1.5);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x] !== null) {
        fill(board[y][x]);   // fill with color if block exists
      } 
      else {
        noFill();            // keep it empty if null
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}


// Picks random shape and color
function spawnNewShape() {
  let index = floor(random(TETROMINOES.length));
  currentPiece = TETROMINOES[index];
  currentColor = COLORS[index];
  pieceX = floor(cols / 2) - floor(currentPiece[0].length / 2);
  pieceY = 0;
  fallTimer = 0;

  // If the top space is blocked, that means the game is over
  if (!isValid(currentPiece, pieceX, pieceY)) {
    gameState = "GAMEOVER";
  }
}


// Draws the falling piece square by square
function drawPiece(shape, posX, posY) {
  fill(currentColor);
  strokeWeight(2.25);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {
        square((posX + x) * cellSize, (posY + y) * cellSize, cellSize);
      }
    }
  }
}


// Checks if shape touches the bottom or another shape
function atBottom() {
  for (let y = 0; y < currentPiece.length; y++) {
    for (let x = 0; x < currentPiece[y].length; x++) {
      if (currentPiece[y][x] === 1) {
        let nextY = pieceY + y + 1;

        // If it reaches bottom or another block, return true
        if (nextY >= rows) {
          return true;
        }
        else if (board[nextY][pieceX + x] !== null) {
          return true;
        }
      }
    }
  }
  return false;
}


// When shape lands, save it to the board permanently
function savePiece() {
  for (let y = 0; y < currentPiece.length; y++) {
    for (let x = 0; x < currentPiece[y].length; x++) {
      if (currentPiece[y][x] === 1) {
        let boardY = pieceY + y;
        let boardX = pieceX + x;

        // Check to make sure inside grid boundaries
        if (boardY >= 0 && boardY < rows && boardX >= 0 && boardX < cols) {
          board[boardY][boardX] = currentColor;
        }
      }
    }
  }
  clearFullRows();  // check for any completed rows
}


// Makes sure shape stays inside board and doesn't hit other blocks
function isValid(shape, newX, newY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {
        let finalX = newX + x;
        let finalY = newY + y;

        // If outside of left or right or bottom edges then not valid
        if (finalX < 0 || finalX >= cols || finalY >= rows) {
          return false;
        }

        // If touching another placed block then not valid
        if (finalY >= 0 && board[finalY][finalX] !== null) {
          return false;      
        }
      }
    }
  }
  return true;
}


// Movement and rotation with keys
function keyPressed() {
  if (gameState === "PLAY") {
    if (key === "a" || key === "A") { 
      if (isValid(currentPiece, pieceX - 1, pieceY)) {
        pieceX--;  // move left
      }
    }
    else if (key === "d" || key === "D") { 
      if (isValid(currentPiece, pieceX + 1, pieceY)) {
        pieceX++;  // move right
      }
    }
    else if (key === "s" || key === "S") { 
      if (isValid(currentPiece, pieceX, pieceY + 1)) {
        pieceY++;  // move down faster
      }
    }
    else if (key === "w" || key === "W") {
      let rotated = rotateShape(currentPiece);
      if (isValid(rotated, pieceX, pieceY)) {
        currentPiece = rotated;  // rotate if space is clear
      }
    }
  }
}


// Checks for filled rows and clears them
function clearFullRows() {
  let newBoard = [];
  let rowsCleared = 0;

  // Go through every row and see if it's completely filled
  for (let y = 0; y < rows; y++) {
    let rowIsFull = true;

    // Check every column in the current row
    for (let x = 0; x < cols; x++) {
      if (board[y][x] === null) {
        rowIsFull = false;  // found an empty spot means it is not full
      }
    }

    // If row is not full, keep it
    if (!rowIsFull) {
      newBoard.push(board[y]);
    } 
    else {
      rowsCleared++;  // count how many full rows we cleared
    }
  }

  // Add empty rows on top for the cleared ones
  for (let i = 0; i < rowsCleared; i++) {
    let emptyRow = [];
    for (let x = 0; x < cols; x++) {
      emptyRow.push(null);
    }
    newBoard.unshift(emptyRow);  // adds new empty rows to the top
  }

  board = newBoard;  // update the main board
}


// Rotates shape clockwise
function rotateShape(shape) {
  let newShape = [];

  // Rotates shape by turning its columns into rows
  for (let x = 0; x < shape[0].length; x++) {
    let newRow = [];
    for (let y = shape.length - 1; y >= 0; y--) {
      newRow.push(shape[y][x]);
    }
    newShape.push(newRow);
  }
  return newShape;
}