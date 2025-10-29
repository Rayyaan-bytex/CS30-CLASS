// Game Of Life - Demo

const CELL_SIZE = 20;
const RENDER_ON_FRAME = 5;
let grid;
let rows;
let cols;
let autoPlayIsOn = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  if (autoPlayIsOn && frameCount % RENDER_ON_FRAME === 0) {
    grid = updateGrid();
  }
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x ,y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e" || key === "E") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === " ") {
    grid = updateGrid();
  }
  else if(key === "a" || key === "A") {
    autoPlayIsOn = !autoPlayIsOn;
  }
}

function updateGrid() {
  let nextTurn = generateEmptyGrid(cols, rows);

  // Look at every cell
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // Don't fall of grid
          if (x + j >= 0 && x + j < cols && y + i >= 0&& y + i < rows) {
            neighbours += grid[y + i][x + j];
          }
        }
      }

      // Don't count self as neighbour
      neighbours -= grid[y][x];

      // Apply the rules
      if (grid[y][x] === 1) {
        // Currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) {
        // Currently Dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}