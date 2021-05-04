var gsize = 5;
var canvasSize;
var sqwidth;
var btnBuffer = 40;

var buttons = new Array(gsize*gsize);
var increaseSize;
var decreaseSize;

var solution={"size":gsize,steps:new Array(gsize*gsize).fill(0)};

function setup() {
    canvasSize=getSize();
    sqwidth=canvasSize/gsize;
    cnv=createCanvas(sqwidth * gsize + 2 * gsize, sqwidth * gsize + 2 * gsize + btnBuffer);
    
    increaseSize = new Clickable();
    increaseSize.locate(width/2,height - btnBuffer);
    increaseSize.resize(width/2,btnBuffer);
    increaseSize.cornerRadius = 2;
    increaseSize.text = "Bigger";
    increaseSize.onPress = function(){
        gsize++;
        solution = {size:"gsize",steps:new Array(gsize*gsize).fill(0)};
        loadGrid();
    }

    decreaseSize = new Clickable();
    decreaseSize.locate(0, height - btnBuffer);
    decreaseSize.resize(width/2,btnBuffer);
    decreaseSize.cornerRadius = 2;
    decreaseSize.text = "Smaller";
    decreaseSize.onPress = function(){
        gsize--;
        solution = {size:"gsize",steps:new Array(gsize*gsize).fill(0)};
        loadGrid();
    }

    loadGrid();
}

function getSize(){
    if(windowHeight < windowWidth){
        canvasSize = windowHeight - 2*gsize - 50;
    } else {
        canvasSize = windowWidth - 2*gsize - 50
    }
   
}

function draw() {
    background("grey");
    centerCanvas();
    drawButtons();
}

function windowResized(){
    if(windowHeight < windowWidth){
        canvasSize = windowHeight - 2*gsize - 50;
    } else {
        canvasSize = windowWidth - 2*gsize - 50
    }
    sqwidth=canvasSize/gsize;
    resizeCanvas(sqwidth * gsize + 2 * gsize, sqwidth * gsize + 2 * gsize + btnBuffer);

    increaseSize.locate(width/2,height - btnBuffer);
    increaseSize.resize(width/2,btnBuffer);
    decreaseSize.locate(0, height - btnBuffer);
    decreaseSize.resize(width/2,btnBuffer);

    loadGrid();
}

function loadGrid(){
    buttons = new Array(gsize*gsize);
    sqwidth = canvasSize/gsize;
    // A loop to evenly space out the buttons along the window
    // This also will add the button action
    for (var i = 0; i < buttons.length; i++) {
        var nb = new Clickable()
        
        nb.locate((i%gsize) * (sqwidth + 2) + 1, int(i/gsize) * (sqwidth + 2) + 1);
        nb.text = "";
        nb.cornerRadius = 2;
        nb.stroke = "grey";
        nb.resize(sqwidth,sqwidth);
        buttons[i] = nb;

        // Why does this fix it? Fuck if I know, for some reason it needs to be inside another function (pass by value only works in new scope?)
        (function(index){buttons[i].onPress = function(){swap(index);}})(i);
    }
}

function swap(index){
    console.log(index,index%gsize,int(index/gsize));
    solution.steps[index] = (solution.steps[index]+1)%2;
    invert(index);
    if(index % gsize != 0){
        invert(index-1);
    }
    if(index % gsize != gsize-1){
        invert(index+1);
    }
    if(int(index/gsize) != 0){
        invert(index-gsize);
    }
    if(int(index/gsize) != gsize-1){
        invert(index+gsize);
    }
}

function logSteps(){
    //console.table(
}

function invert(index){
    if(buttons[index].color == "#FFFFFF"){
        buttons[index].color = "#AAAAFF";
    } else {
        buttons[index].color = "#FFFFFF";
    }
}

function drawButtons(){
    for(var i = 0; i < buttons.length; i++){
        buttons[i].draw();    
    }
    increaseSize.draw();
    decreaseSize.draw();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
