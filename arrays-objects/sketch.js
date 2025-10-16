// Arrays and Objects - Water/Ball Sorting Game
// Rayyaan Chaghtai
// Oct 10, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "START";
let numTubes;
let tubeSpacing = 130;
let tubeY = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("cyan");
  startScreen();
}

function startScreen() {
  startButton = createButton("START GAME");
  startButton.style("background-color", "green");
  startButton.style("color", "white");
  startButton.style("font-size", "16px");
  startButton.style("font-weight", "bold");
  startButton.style("border-radius", "10px");
  startButton.style("padding", "10px 20px");  
  startButton.style("cursor", "pointer");
  startButton.position(width / 2 - 60, height / 2 + 100);
} 

// function game() {
//   tubes = [];

//   for (let i = 0; i < numTubes; i++) {
//     tubes.push(
//     )
//   }
// }
