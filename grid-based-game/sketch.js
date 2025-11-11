// Grid-Based Game  -  Tetris Game
// Rayyaan Chaghtai
// November 12, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "START";
let cellSize = 40;
let cols = 10;
let rows;
let currentPiece;
let pieceX;
let pieceY;
let fallTimer = 0;
let fallSpeed = 30;
let board;


const T = [[1, 1, 1],
  [0, 1, 0]];

const O = [[1, 1],
  [1, 1]];

const I = [[1, 1, 1, 1]];

const L = [[1, 0],
  [1, 0], 
  [1, 1]];

const S = [[0, 1, 1],
  [1, 1, 0]];

const TETROMINOES = [T, O, I, L, S];  

const COLORS = ["purple", "yellow", "cyan", "orange", "green"];


function setup() {
  createCanvas(500, 500);

  rows = floor(windowHeight / cellSize);
  board = [];

  for (let y = 0; y < rows; y++) {
    let boardRow = [];
    for (let x = 0; x < cols; x++) {
      boardRow.push(0);
    }
    board.push(boardRow);
  }

  createStartButton();
}


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


function startGame() {
  startButton.hide();
  gameState = "PLAY";
  spawnNewShape();
}


function resetGame() {

}


function draw() {
  background('#56bbe4ff');
  
  if (gameState === "START") {
    drawStartScreen();
  }
  else if (gameState === "PLAY") {
    resizeCanvas(400, windowHeight);
    background('#535364ff');    
    drawGame();   

    if (currentPiece) {
      fallTimer++;
      if (fallTimer > fallSpeed) {
        if (atBottom()) {
          savePiece();
        } 
        else {
          pieceY++;
        }
        fallTimer = 0;
      }
      drawPiece(currentPiece, pieceX, pieceY);
    }
  }

  else if (gameState === "LOSE") {
  }
} 


function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(36);
  textStyle(BOLD);
  fill("white");
  text("🟥Tetris Game🟥", width / 2, height / 2 - 120);

  textSize(25);
  text("⬇️Click The Button Below To Start⬇️", width / 2, height / 2 - 60);

  textSize(25);
  text("INSTRUCTIONS", width / 2, height / 2 - 10);

  textSize(16);
  text("• Rotate Falling Shapes To Fit Them Into A Grid\n• Prevent The Stack From The Reaching The Top\n• Complete Solid Horizontal Lines To Score!", width / 2, height / 2 + 45);
}


function drawGame() {
  noFill();
  strokeWeight(2.25);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols  ; x++) {
      square(x * cellSize, y * cellSize, cellSize);
      if (board[y][x] !== 0) {
        fill(board[y][x]);
      }
      else {
        noFill();
      }
        square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function spawnNewShape() {
  let index = Math.floor(random(TETROMINOES.length));
  currentPiece = TETROMINOES[index];
  currentColor = COLORS[index];
  pieceX = floor(cols / 2) - floor(currentPiece[0].length / 2 );
  pieceY = 0;
  fallTimer = 0;
}

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

function atBottom() {
    for (let y = 0; y < currentPiece.length; y++) {
    for (let x = 0; x < currentPiece[y].length; x++) {
      if (currentPiece[y][x] === 1) {
        let nextY = pieceY + y + 1;

        if (nextY >= rows) {
          return true;
        }

        if (board[nextY][pieceX + x] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}


function savePiece() {
  for (let y = 0; y < currentPiece.length; y++) {
    for (let x = 0; x < currentPiece[y].length; x++) {
      if (currentPiece[y][x] === 1 && pieceY + y < rows && pieceX + x < cols) {
        board[pieceY + y][pieceX + x] = currentColor;
      }
    }
  }

  spawnNewShape();
}