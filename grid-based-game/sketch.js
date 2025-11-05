// Grid-Based Game  -  Tetris Game
// Rayyaan Chaghtai
// November 12, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "START";
let cellSize = 45;


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
  strokeWeight(0);
  stroke(0);
  noFill();
  rect(45, 45, griSize * cellSize, griSize * cellSize);

}