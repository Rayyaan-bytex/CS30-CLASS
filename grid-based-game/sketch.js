// Grid-Based Game  -  Tetris 
// Rayyaan Chaghtai
// November, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "START";


function setup() {
  createCanvas(500, 500 );
  createStartButton();
}


function createStartButton() {
  startButton = createButton("START GAME");
  startButton.style("background-color", "cyan");
  startButton.style("color", "black");
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
}


function draw() {
  background("#60eb83");
  if (gameState === "Start") {
    drawStartScreen();
  }
  else if (gameState === "Play") {
    background(220);
    drawGame();   
  }
  else if (gameState === "Win") {
    
  }
} 


function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(36);
  textStyle(BOLD);
  text("🟥Tetris Game🟥", width / 2, height / 2 - 120);

  textSize(25);
  text("⬇️Click The Button Below To Start⬇️", width / 2, height / 2 - 60);

  textSize(25);
  text("INSTRUCTIONS", width / 2, height / 2 - 10);

  textSize(16);
  text("• Rotate Falling Shapes To Fit Them Into A Grid\n• Prevent The Stack From The Reaching The Top\n• Complete Solid Horizontal Lines To Score!", width / 2, height / 2 + 45);
}


function drawGame() {
  resizeCanvas(450, windowHeight);
}