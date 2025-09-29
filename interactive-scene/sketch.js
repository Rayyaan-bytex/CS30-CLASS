// Interactive Scene
// Rayyaan Chaghtai
// 9/25/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rows;
let cols;  
let cellSize = 50;
let board = [];

function setup() {
  createCanvas(600, 600);
  cols = width/cellSize;
  rows = height/cellSize; 
  for (let x = 0; x < cols; x++) {
    board[x] = [];
    for (let y=0; y < rows; y++) {
      board[x][y] = 0;  
    }
  }
}

function draw() {
  snakeGrid();
  food();
}

function snakeGrid() {
  // noStroke();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++){
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function showSnake() {
  
}

function food() {
  let newX;
  let newY;
  let eaten = true;

  newX = floor(random(0, width/cellSize)) * cellSize;
   
}