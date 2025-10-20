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
let topY = 200;
let colors = ["red", "green", "blue", "yellow"];
let tubes = [];


function setup() {
  createCanvas(700, 500);
}


function draw() {
  background('#72D5E9');

  if (gameState === "START") {
    drawStartScreen();
  }
  else if (gameState === "PLAY") {
    background(220);
    playGame();
  }
  else if (gameState === "WIN") {
    background(220);
    playGame();
  }


  startScreen();
  drawStartScreen();
}


// button to switch to game
function startScreen() {
  startButton = createButton("START GAME");
  startButton.style("background-color", "green");
  startButton.style("color", "white");
  startButton.style("font-size", "16px");
  startButton.style("font-weight", "bold");
  startButton.style("border-radius", "10px");
  startButton.style("padding", "10px 20px");  
  startButton.style("cursor", "pointer");
  startButton.position(width / 2 - 72, height / 2 + 100);
  // startButton.mousePressed()
} 


function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(36);
  textStyle(BOLD);
  text("🎨Ball Sort Game🎨", width/2, height/2 - 120);
  textSize(25);
  text("⬇️Click The Button Below To Start⬇️", width/2, height/2 - 60);
  textSize(25);
  text("INSTRUCTIONS", width/2, height/2 - 10);
  textSize(16);
  text("• Click a tube to pick up a ball\n• Click another tube to drop it\n• Sort them however you like!", width/2, height/2 + 45);
}


function drawGame() {
  textAlign(CENTER);
  textSize(22);
  textStyle(BOLD);
  fill(0);
  text("CLICK TUBES TO MOVE BALLS!", width / 2, 40);

  for (let i = 0; i < tubes.length; i++) {
    drawTube(tubes[i], i);
  }
}

function drawTube(tube) {
  // draws the tube
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(tube.x, tube.y, tubeWidth, tubeHeight, 15);

  noStroke();
  for (let i = 0; i < tubes.length; i++) {

  }
}

// function playGame() {
//   let tubeX = 100 + i * tubeSpacing;
//   let tubeY = topY;
//   let tube;
//   tubes = [];

//   for (let i = 0; i < numTubes; i++) {
//     tube = {
//       x: tubeX,
//       y: tubeY,
//       balls: []
//     };
//     tubes.push(tube);
//   }
// }

