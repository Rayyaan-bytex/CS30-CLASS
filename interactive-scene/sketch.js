// Interactive Scene
// Rayyaan Chaghtai
// 9/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cellSize = 25;
let gridSize = 12;
let gameState = "start";
let gameState2 = ""

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);

  if (gameState === "start") {
    snakeGrid();
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Click To Start Snake Game", width/2, height/2);
  }
}


function snakeGrid() {
  noStroke();
  noFill();
  rect(50, 50, gridSize * cellSize, gridSize * cellSize);
}
