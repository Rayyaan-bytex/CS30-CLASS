// Arrays and Objects - Water/Ball Sorting Game
// Rayyaan Chaghtai
// Oct 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "START";
let tubes = [];
let selectedTube = -1;
let numTubes = 4;
let tubeSpacing = 130;
let tubeWidth = 80;
let tubeHeight = 220;
let tubeTop = 200; 
let colors = ["red", "green", "blue"];
let startButton;
let ballsPerColor = 4;


function setup() {
  createCanvas(700, 500);

  // create the start button 
  startButton = createButton("START GAME");
  startButton.style("background-color", "green");
  startButton.style("color", "white");
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
  resetGame();
  gameState = "PLAY";
}


function resetGame() {
  tubes = [];

  // automatically space tubes evenly across the canvas
  let totalWidth = numTubes * tubeWidth + (numTubes - 1) * 90; // default spacing guess
  let startX = (width - totalWidth) / 2; // centers tubes
  let spacing = 90;

  for (let i = 0; i < numTubes; i++) {
    let x = startX + i * (tubeWidth + spacing);
    let y = tubeTop;
    let tube = {};
    tube.x = x;
    tube.y = y;
    tube.balls = [];
    tubes.push(tube);
  }

  let allBalls = [];
  for (let color of colors) {
    for (let i = 0; i < ballsPerColor; i++) {
      allBalls.push(color);
    }
  }

  shuffle(allBalls, true);

  let index = 0;

  for (let i = 0; i < numTubes - 1; i++) {
    for (let j = 0; j < ballsPerColor; j++) {
      let color = allBalls[index];
      tubes[i].balls.push(color);
      index++;
    }
  }
}


function draw() {
  background('#72D5E9');

  if (gameState === "START") {
    drawStartScreen();
  }
  else if (gameState === "PLAY") {
    background(220);
    drawGame();
    if (checkWin()) {
      gameState = "WIN";
    }
  }
  else if (gameState === "WIN") {
    background(220);
    drawGame();
    drawWinScreen(); 
  }
}


function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(36);
  textStyle(BOLD);
  text("🎨Ball Sort Game🎨", width / 2, height / 2 - 120);
  textSize(25);
  text("⬇️Click The Button Below To Start⬇️", width / 2, height / 2 - 60);
  textSize(25);
  text("INSTRUCTIONS", width / 2, height / 2 - 10);
  textSize(16);
  text("• Click a tube to pick up a ball\n• Click another tube to drop it\n• Sort them however you like!", width / 2, height / 2 + 45);
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


function drawTube(tube, index) {
  // draws the tube
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(tube.x, tube.y, tubeWidth, tubeHeight, 15);

  if (selectedTube === index) {
    strokeWeight(6);
    stroke('orange');
    rect(tube.x - 5, tube.y - 5, tubeWidth + 10, tubeHeight + 10, 10);
  }

  noStroke();
  for (let i = 0; i < tube.balls.length; i++) {
    fill(tube.balls[i]);
    let spaceBetween = 50;
    let positionY = tube.y + tubeHeight - 40 - i * spaceBetween;
    circle(tube.x + tubeWidth / 2, positionY, 45);
  }
}


function mousePressed() {
  if (gameState === "PLAY") {
    for (let i = 0; i < tubes.length; i++) {
      let t = tubes[i];
      if (mouseX > t.x && 
          mouseX < t.x + tubeWidth && 
          mouseY > t.y && 
          mouseY < t.y + tubeHeight) {
        tubeClicked(i); 
      }
    }
  }
}


function tubeClicked(index) {
  if (selectedTube === -1) {
    if (tubes[index].balls.length > 0) { 
      selectedTube = index;
    }
  } 
  else if (index !== selectedTube) {
    moveBall(selectedTube, index);
    selectedTube = -1;
  }
}


function moveBall(fromTube, toTube) {
  let takeFrom = tubes[fromTube];
  let putIn = tubes[toTube];

  if (takeFrom.balls.length === 0) { 
    return false;
  }
  if (putIn.balls.length >= ballsPerColor) {
    return false;
  }

  let ball = takeFrom.balls.pop();
  putIn.balls.push(ball);
  return true;
}


function checkWin() {
  for (let tube of tubes) {
    if (tube.balls.length === 0) {
      continue;
    }
    if (tube.balls.length !== ballsPerColor) {
      return false;
    }
    let color = tube.balls[0];
    for (let ball of tube.balls) {
      if (ball !== color) {
        return false;
      }
    }
  } 
  return true;
}


function drawWinScreen() {
  fill(0, 255, 255, 200);
  rect(width / 2 - 200, height / 2 - 100, 400, 220, 25);
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(34);
  textStyle(BOLD);
  text("🎉 YOU WIN! 🎉", width / 2, height / 2);

  textSize(18);
  text("PRESS 'R' TO  RESTART", width / 2, height / 2 + 30)
}

function keyPressed() {
  if (gameState === "WIN" && (key === "r" || key === "R")) {
    gameState = "START";
    drawStartScreen();
  }
}
