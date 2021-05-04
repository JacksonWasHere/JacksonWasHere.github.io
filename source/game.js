var gsize = 5;
var canvasSize = 420;
var sqwidth = canvasSize/gsize;
var btnBuffer = 40;

var buttons = new Array(gsize*gsize);
var increaseSize;
var decreaseSize;

function setup() {
    cnv=createCanvas(sqwidth * gsize + 2 * gsize, sqwidth * gsize + 2 * gsize + btnBuffer);
    
    increaseSize = new Clickable();
    increaseSize.locate(width/2,height - btnBuffer);
    increaseSize.resize(width/2,btnBuffer);
    increaseSize.cornerRadius = 2;
    increaseSize.text = "Bigger";
    increaseSize.onPress = function(){
        gsize++;
        loadGrid();
    }

    decreaseSize = new Clickable();
    decreaseSize.locate(0, height - btnBuffer);
    decreaseSize.resize(width/2,btnBuffer);
    decreaseSize.cornerRadius = 2;
    decreaseSize.text = "Smaller";
    decreaseSize.onPress = function(){
        gsize--;
        loadGrid();
    }

    loadGrid();
}


function draw() {
    background("grey");
    centerCanvas();
    drawButtons();
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
