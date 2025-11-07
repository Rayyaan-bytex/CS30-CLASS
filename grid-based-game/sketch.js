// Grid-Based Game  -  Tetris Game
// Rayyaan Chaghtai
// November 12, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "START";
let cellSize = 45;
let cols = 10;
let rows;
let currentPiece;
let pieceX;
let pieceY;
let fallTimer = 0;
let fallSpeed = 30;


const T = [[0, 1, 0],
  [1, 1, 1]];

const O = [[1, 1],
  [1, 1]];

const I = [[1, 1, 1, 1]];

const L = [[1, 0],
  [1, 0], 
  [1, 1]];

const S = [[0, 1, 1],
  [1, 1, 0]];

const tetrominoes = [T, O, I, L, S];  


function setup() {
  createCanvas(500, 500 );
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
  drawGame();
  spawnNewShape();
  gameState = "PLAY";
}


function resetGame() {

}


function draw() {
  background('#56bbe4ff');
  
  if (gameState === "START") {
    drawStartScreen();
  }
  else if (gameState === "PLAY") {
    resizeCanvas(450, windowHeight);
    background('#535364ff');    
    drawGame();   

    fallTimer++;
    if (fallTimer > fallSpeed) {
      pieceY++;
      fallTimer = 0;
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
  let rows = windowHeight / cellSize;
  noFill();
  strokeWeight(2.25);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols  ; x++) {
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function spawnNewShape() {
  currentPiece = tetrominoes[Math.floor(random(tetrominoes.length))];
  pieceX = 3;
  pieceY = 0;
}

function drawPiece() {

}