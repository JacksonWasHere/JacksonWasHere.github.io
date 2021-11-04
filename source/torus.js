var grid = []
var gridSize = 3
var canvasSize;
var sqwidth;
var cnv;
var buffer = 50
var stWid = 2
var rectRad = 10

var animating = false;
var speed = 5;
var counter = 0;
var isRow = false;
var isForward = false;

var activeRow = 1;
var activeColumn = 1;

function setup(){
  grid = makeGrid(grid)
  setCanvas();
}

function draw(){
  centerCanvas()

  drawGrid(0,0,canvasSize,canvasSize)
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var r = 160;
      var g = 160;
      if(i == activeRow){
        g += 40
      }
      if(j == activeColumn){
        r += 40
      }
      fill(r,g,160,100)
      strokeWeight(stWid)
      stroke(0)
      rect(j*(canvasSize/gridSize) + stWid/2,i*(canvasSize/gridSize) + stWid/2,canvasSize/gridSize - stWid,canvasSize/gridSize - stWid,rectRad)
    }
  }

  //while animating increase the counter
  if (animating) {
    counter += 1;
    if (counter == speed) {
      //When the counter is up reset and perform the data swap.
      counter = 0;
      animating = false;
      if (isRow) {
        if (isForward) {
          moveRow(activeRow)
        } else {
          for(var i = 1; i < gridSize; i++){
            moveRow(activeRow)
          }
        }
      } else {
        if (isForward) {
          moveColumn(activeColumn)
        } else {
          for(var i = 1; i < gridSize; i++){
            moveColumn(activeColumn)
          }
        }
      }
    }
  }
}

function keyPressed(){
  if (!animating) {
    //Increase grid size
    if (key == "t") {
      gridSize += 1;
      grid = makeGrid(grid)
      setCanvas();
    } else if (key == "g") {
      gridSize -= 1;
      grid = makeGrid(grid)
      setCanvas();
    }

    //Move active column
    if (key=="w") {
      activeRow = (activeRow - 1).mod(gridSize)
    } else if (key == "s") {
      activeRow = (activeRow + 1).mod(gridSize)
    } else if (key == "d") {
      activeColumn = (activeColumn + 1).mod(gridSize)
    } else if (key == "a") {
      activeColumn = (activeColumn - 1).mod(gridSize)
    }

    //Initiate animation
    if (key == "i") {
      animating = true;
      isRow = false;
      isForward = false;
    } else if (key == "k") {
      animating = true;
      isRow = false;
      isForward = true;
    } else if (key == "j") {
      animating = true;
      isRow = true;
      isForward = false;
    } else if (key == "l") {
      animating = true;
      isRow = true;
      isForward = true;
    }
  }
}

function moveRow(ndx){
  var n = gridSize;
  var tmp;
  for (var i = n-1; i > 0; i--) {
    //Swap each element with the one previous, in reverse orbit. Don't perform this with the first element.
    tmp = grid[ndx][i.mod(n)];
    grid[ndx][i.mod(n)] = grid[ndx][(i-1).mod(n)]
    grid[ndx][(i-1).mod(n)] = tmp
  }
}

function moveColumn(ndx){
  var n = gridSize;
  var tmp;
  console.log(ndx);
  for (var i = n-1; i > 0; i--) {
    tmp = grid[i.mod(n)][ndx];
    grid[i.mod(n)][ndx] = grid[(i-1).mod(n)][ndx]
    grid[(i-1).mod(n)][ndx] = tmp
  }
}

function drawGrid(x,y,wid,hgt){
  //Square sizes
  var cwid = wid/gridSize - stWid
  var chgt = hgt/gridSize - stWid
  background(128)

  //Include outside squares for animation.
  for (var i = -1; i < gridSize+1; i++) {
    for (var j = -1; j < gridSize+1; j++) {
      var a = 0;
      var b = 0;
      // Move the squares smoothly
      if (isRow && i == activeRow) {
        //First part is to change direction, counter increases and speed decides how many ticks are required
        a = (2*isForward-1) * counter * 1/speed;
      } else if (!isRow && j == activeColumn) {
        b = (2*isForward-1) * counter * 1/speed;
      }
      fill(180)
      drawCell((j+a)*(cwid + stWid) + stWid/2 + x,(i + b)*(chgt + stWid) + stWid/2 + y,cwid,chgt,grid[i.mod(gridSize)][j.mod(gridSize)])
    }
  }
}

function drawCell(x,y,wid,hgt,label){
  strokeWeight(stWid)
  stroke(0)
  rect(x,y,wid,hgt,rectRad)
  fill(0)
  strokeWeight(1)
  textSize(50)
  textAlign(CENTER,CENTER)
  text(label,x+wid/2,y+hgt/2)
}

// ----- SETUP ----- //
function makeGrid(oldGrid){
  for (var i = 0; i < gridSize; i++) {
    oldGrid[i]=[]
    for (var j = 0; j < gridSize; j++) {
      oldGrid[i][j] = i*gridSize + j + 1
    }
  }
  return oldGrid
}

// ----- CANVAS FUNCTIONS -----//
function windowResized(){
  setCanvas()
}

function setCanvas(){
  canvasSize=getSize();
  sqwidth=canvasSize/gridSize;
  cnv=createCanvas(canvasSize, canvasSize);
  drawGrid(0,0,canvasSize - 2 * 0,canvasSize - 2 * 0)
}

Number.prototype.mod = function (b) {
  return ((this % b)+b)%b
};

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function getSize(){
    if(windowHeight < windowWidth){
        return windowHeight - buffer
    } else {
        return windowWidth - buffer;
    }
}
