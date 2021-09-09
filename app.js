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

//the cellClass
class Cell {
  constructor(left, top, w, h, row, col) {
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.bottom = top + h;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.centerX = left + w / 2;
    this.centerY = top + h / 2;
    this.r = (w * GRID_CIRCLE) / 2;
    this.highlight = null;
    this.owner = null;
  }

  //the draw Circle function
  draw(canvasContext) {
    //owner color
    let color = null ? COLOR_BG : this.owner ? COLOR_RI : COLOR_AI;

    //drawing the circle
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
    canvasContext.fill();

    //drawing the highlighting
    if (this.highlight != null) {
      //color
      color = this.highlight ? COLOR_RI : COLOR_AI;

      //draw a circle around the perimeter
      canvasContext.lineWidth = this.r / 4;
      canvasContext.strokeStyle = color;
      canvasContext.beginPath();
      canvasContext.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
      canvasContext.stroke();
    }
  }
}

//game variables
let gameOver,
  gameTied,
  grid = [],
  playersTurn,
  timeAI;

//window resize event listener

//canvas dimension
let width, height, margin;
setDimensions();

//windowresize event listener
//canvasEl.addEventListener("mousemove", highlightGrid);
window.addEventListener("resize", setDimensions);
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

  //draw functions
  drawBackground();
  drawGrid();

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

  //populating the grid
  for (let i = 0; i < GRID_ROWS; i++) {
    grid[i] = [];

    for (let j = 0; j < GRID_COLS; j++) {
      let left = marginX + j * cell;
      let top = marginY + i * cell;
      grid[i][j] = new Cell(left, top, cell);
    }
  }
}
//draw background function
function drawBackground() {
  canvasContext.fillStyle = COLOR_BG;
  canvasContext.fillRect(0, 0, width, height);
}

//drawGrid function
function drawGrid() {
  //frame and bottom
  let cell = grid[0][0];
  let frameHeight = cell.h * GRID_ROWS;
  let frameWidth = cell.w * GRID_COLS;
  canvasContext.fillStyle = COLOR_FRAME;
  canvasContext.fillRect(cell.left, cell.top, frameWidth, frameHeight);
  canvasContext.fillStyle = COLOR_FRAME_BOTTOM;
  canvasContext.fillRect(
    cell.left - margin / 2,
    cell.top + frameHeight - margin / 2,
    frameWidth + margin,
    margin
  );

  canvasContext.fill();

  // cells
  for (let row of grid) {
    for (let cell of row) {
      cell.draw(canvasContext);
    }
  }
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
