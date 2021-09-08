const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

// game parameters
const GRID_CIRCLE = 0.7; // circle size as a fraction of the cell size
const GRID_COLS = 7; // number of game columns
const GRID_ROWS = 6; // number of game rows
const MARGIN = 0.02; // margin as a fraction of the shortest screen dimension

// colors
const COLOR_BG = "#f9f9f9";
const COLOR_FRAME = "#382039";
const COLOR_FRAME_BOTTOM = "#200f21";
const COLOR_AI = "lawngreen";
const COLOR_AI_DARK = "darkgreen";
const COLOR_RI = "orange";
const COLOR_RI_DARK = " darkgoldenrod";

//the game loop
let timeDiff, timeLast;
requestAnimationFrame(playGame);
function playGame(timeNow) {
  //initialize timeLast
  if (!timeLast) {
    timeLast = timeNow;
  }

  //calculate the time diff
  timeDiff = (timeNow - timeLast) / 1000; //seconds
  timeLast = timeNow;

  //calling the next frame
  requestAnimationFrame(playGame);
}

//newGame function
function newGame() {
  createGrid();
}

//createGrid function
function createGrid() {
  grid = [];

  //set up cell size and margins
  let cell, marginX, marginY;

  //device portrait orientation
  if (((width - margin * 2) * GRID_ROWS) / GRID_COLS < height - margin * 2) {
    cell = (width * margin * 2) / GRID_COLS;
    marginX = margin;
    marginY = (height - cell * GRID_ROWS) / 2;
  }
  //device landscape orientation
  else {
    cell = (height - margin * 2) / GRID_ROWS;
    marginY = margin;
    marginX = width - (cell * GRID_COLS) / 2;
  }
}
//draw background function
function drawBackground() {
  canvasContext.fillStyle = COLOR_BG;
  canvasContext.fillRect(0, 0, width, height);
}

//setdimensions function
function setDimensions() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvasEl.width = width;
  canvasEl.height = height;
  margin = MARGIN * Math.min(height, width);

  newGame();
}
