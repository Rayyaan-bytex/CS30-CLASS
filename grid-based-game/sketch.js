// Grid-Based Game  -  Tetris 
// Rayyaan Chaghtai
// November, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(500, 500 );
}

function draw() {
  background("#0049B7");
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