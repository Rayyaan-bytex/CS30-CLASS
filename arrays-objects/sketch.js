// Arrays and Objects - Ball Sorting Game
// Rayyaan Chaghtai
// Oct 26, 2025
//
// Extra for Experts:
// I used the shuffle() function to randomize the ball colors each time the game starts. 
// I also used the createButton() function to make a Start Game button on the start screen.


let gameState = "START";    // Controls which screen to show 
let tubes = [];             // Array holding all tube objects
let selectedTube = -1;      // Stores which tube is currently selected
let numTubes = 4;           // Number of tubes in the game
let tubeSpacing = 130;      // Space between each tube
let tubeWidth = 80;         // Tube width
let tubeHeight = 220;       // Tube height
let tubeTop = 200;          // Vertical position of tubes
let colors = ["red", "green", "blue"];   // Ball colors
let startButton;            // Button to start the game
let ballsPerColor = 4;      // How many balls each color has


// Sets up the canvas and starts new game
function setup() {
  createCanvas(700, 500);
  createStartButton(); // Display start button initially
}


// Creates the "Start Game" button and styles it
function createStartButton() {
  startButton = createButton("START GAME");
  startButton.style("background-color", "green");
  startButton.style("color", "white");
  startButton.style("font-size", "16px");
  startButton.style("font-weight", "bold");
  startButton.style("border-radius", "10px");
  startButton.style("padding", "10px 20px");
  startButton.style("cursor", "pointer");
  startButton.position(width / 2 - 72, height / 2 + 100);
  startButton.mousePressed(startGame); // Run startGame() when clicked
}


// Hides the start button and starts gameplay
function startGame() {
  startButton.hide();   // Remove start button
  resetGame();          // Set up new game state
  gameState = "PLAY";   // Switches gamestate
}


// Creates tube objects and fills them with shuffled balls
function resetGame() {
  tubes = []; // Clear existing tubes

  // Automatically space tubes evenly across canvas
  let totalWidth = numTubes * tubeWidth + (numTubes - 1) * 90;
  let startX = (width - totalWidth) / 2;
  let spacing = 90;

  // Create tube objects and store in array
  for (let i = 0; i < numTubes; i++) {
    let x = startX + i * (tubeWidth + spacing);
    let y = tubeTop;
    let tube = {};            // stores multiple properties
    tube.x = x;
    tube.y = y;
    tube.balls = [];          // Each tube has its own array of balls
    tubes.push(tube);         // Add to tubes array
  }

  // Create all balls and randomize their order
  let allBalls = [];
  for (let color of colors) {
    for (let i = 0; i < ballsPerColor; i++) {
      allBalls.push(color);
    }
  }
  shuffle(allBalls, true); // Randomize ball order

  // Fill first 3 tubes with colored balls
  let index = 0;
  for (let i = 0; i < numTubes - 1; i++) {
    for (let j = 0; j < ballsPerColor; j++) {
      let color = allBalls[index];
      tubes[i].balls.push(color);
      index++;
    }
  }
}


// Updates and displays the correct screen based on the game state
function draw() {
  background('#72D5E9'); // Light blue background

  if (gameState === "START") {
    drawStartScreen(); // Show title & instructions
  }
  else if (gameState === "PLAY") {
    background(220);
    drawGame();         // Display game and tubes
    if (checkWin()) {   // Check if player won
      gameState = "WIN";
    }
  }
  else if (gameState === "WIN") {
    background(220);
    drawGame();         // Keep showing tubes
    drawWinScreen();    // Show win message
  }
}


// Shows title and game instructions
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


// Draws the gameplay screen with tubes and text
function drawGame() {
  textAlign(CENTER);
  textSize(22);
  textStyle(BOLD);
  fill(0);
  text("CLICK TUBES TO MOVE BALLS!", width / 2, 40);

  // Loop through all tubes and draw them
  for (let i = 0; i < tubes.length; i++) {
    drawTube(tubes[i], i);
  }
}


// Draws tube outline and balls inside it
function drawTube(tube, index) {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(tube.x, tube.y, tubeWidth, tubeHeight, 15);

  // Highlight selected tube in orange
  if (selectedTube === index) {
    strokeWeight(6);
    stroke('orange');
    rect(tube.x - 5, tube.y - 5, tubeWidth + 10, tubeHeight + 10, 10);
  }

  // Draw each ball inside the tube
  noStroke();
  for (let i = 0; i < tube.balls.length; i++) {
    fill(tube.balls[i]);
    let spaceBetween = 50;
    let positionY = tube.y + tubeHeight - 40 - i * spaceBetween;
    circle(tube.x + tubeWidth / 2, positionY, 45);
  }
}


// Checks if the player clicks a tube
function mousePressed() {
  if (gameState === "PLAY") {
    for (let i = 0; i < tubes.length; i++) {
      let t = tubes[i];
      // Check if mouse click is inside this tube
      if (mouseX > t.x && mouseX < t.x + tubeWidth && 
          mouseY > t.y && mouseY < t.y + tubeHeight) {
        tubeClicked(i);
      }
    }
  }
}


// Checks when a tube is clicked
function tubeClicked(index) {
  // If no tube selected yet
  if (selectedTube === -1) {
    if (tubes[index].balls.length > 0) { 
      selectedTube = index; // Select tube if it has balls
    }
  } 
  // If player clicks another tube, move ball
  else if (index !== selectedTube) {
    moveBall(selectedTube, index);
    selectedTube = -1; // Deselect tube
  }
}

// Moves one ball from one tube to another
function moveBall(fromTube, toTube) {
  let takeFrom = tubes[fromTube];
  let putIn = tubes[toTube];

  // Can't move from empty or into full tube
  if (takeFrom.balls.length === 0) {
    return false;
  }
  if (putIn.balls.length >= ballsPerColor) {
    return false;
  }
  // Move one ball
  let ball = takeFrom.balls.pop();
  putIn.balls.push(ball);
  return true;
}


// Checks if the user has won
function checkWin() {
  // Player wins if each tube has all same-color balls or is empty
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
    return true;
  }
}


// Shows the win and restart message
function drawWinScreen() {
  fill(0, 255, 255, 200);
  rect(width / 2 - 200, height / 2 - 100, 400, 220, 25);
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(34);
  textStyle(BOLD);
  text("🎉 YOU WIN! 🎉", width / 2, height / 2);

  textSize(18);
  text("PRESS 'R' TO  RESTART", width / 2, height / 2 + 30);
}


// Checks key press for restarting
function keyPressed() {
  // After winning, pressing R restarts the game
  if (gameState === "WIN" && (key === "r" || key === "R")) {
    gameState = "START";
    createStartButton(); // Show start button again
  }
}
