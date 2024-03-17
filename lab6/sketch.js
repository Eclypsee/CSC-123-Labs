
const DEFAULT = 0;
const HOVER = 1;
const CLICK = 2;
let boxState;
let cirState;
let hovlen = 0;
let maxHovlen;
let hovrad = 0
let maxHovRad;
let isRolling = false;

//disable scrolling for aesthetics
window.addEventListener('wheel', function(e) {e.preventDefault();}, { passive: false });
// let rectButtonState = 
function setup() {
    createCanvas(visualViewport.width, visualViewport.height);
    background(0);
}

function draw() {
    resizeCanvas(visualViewport.width, visualViewport.height);
    background(0);
    
    //define some vars
    let boxX = width/2-100;
    let boxY = height/3-50;
    let boxLen = 200;
    let boxHei = 100;

    let cirX = width/2;
    let cirY = 2*height/3;
    let rad = 100

    //rect button and collision
    noStroke();
    drawRectButton(boxX, boxY, boxLen, boxHei, color(255, 126, 28))
    checkRectButtonCollision(boxX, boxY, boxLen, boxHei)
    if(boxState == DEFAULT){
        drawRectButton(boxX, boxY, hovlen, boxHei, color(209, 88, 27))
        hovlen-=8;
        hovlen = constrain(hovlen, 0, boxLen)
        
    }else if(boxState == HOVER){
        drawRectButton(boxX, boxY, hovlen, boxHei, color(209, 88, 27))
        hovlen+=8;
        hovlen = constrain(hovlen, 0, boxLen)
    }else if(boxState == CLICK){
        drawRectButton(boxX, boxY, boxLen, boxHei, color(199, 41, 10))
        
      
      
      
      
      
      
      
        
    }
    drawText(boxX+boxLen/2, boxY+boxHei/2, "[CLICK ME]", 30)
    
    //circle button and collision
    noStroke();
    drawCircleButton(cirX, cirY, 2*rad, color(28, 111, 255))
    checkCircleButtonCollision(cirX, cirY, rad)
    if(cirState == DEFAULT){
        drawCircleButton(cirX, cirY, hovrad, color(27, 63, 209))
        hovrad-=10;
        hovrad = constrain(hovrad, 0, 2*rad)
    }else if(cirState == HOVER){
        drawCircleButton(cirX, cirY, hovrad, color(27, 63, 209))
        hovrad+=10;
        hovrad = constrain(hovrad, 0, 2*rad)
    }else if(cirState == CLICK){
        drawCircleButton(cirX, cirY, 2*rad, color(17, 39, 105))
        circlickedonce = true;
      
      
      
      
      
      
    }
    drawText(cirX, cirY, "[CLICK ME]", 30)
  
  
  drawCursor()

}

//rect button
function drawRectButton(x, y, len, hei, col){
    fill(col)
    rect(x, y, len, hei)
}

//circle button
function drawCircleButton(x, y, rad, col){
    fill(col)
    circle(x, y, rad)

}

//handles collisions
function checkRectButtonCollision(x, y, len, hei){
    if(mouseX>=x && mouseX<=x+len && mouseY<=y+hei && mouseY>=y && !mouseIsPressed){
        boxState = HOVER;
    }else if(mouseX>=x && mouseX<=x+len && mouseY<=y+hei && mouseY>=y && mouseIsPressed){
        boxState = CLICK;
    }else{
        boxState = DEFAULT;
    }
}

//handles collisions
function checkCircleButtonCollision(x, y, rad){
    //math .sqrt solves all your problems :)
    if(Math.sqrt(Math.pow(mouseX-x, 2)+Math.pow(mouseY-y, 2))<=rad && !mouseIsPressed){
        cirState = HOVER;
    }else if(Math.sqrt(Math.pow(mouseX-x, 2)+Math.pow(mouseY-y, 2))<=rad && mouseIsPressed){
        cirState = CLICK;
    }else{
        cirState = DEFAULT;
    }
}

function drawText(x, y, t, s){
    push();
        textAlign(CENTER, CENTER);
        textFont('Exo', s); // Set the font to Exo and size to 48
        fill(255); // Set fill color to white
        text(t, x, y);
    pop();
    
}

function drawCursor(){
  noFill()
  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = color(0, 255, 255);
  if(mouseIsPressed)
    fill(255)
  stroke(255)
  strokeWeight(5)
  circle(mouseX, mouseY, 25);
  circle(mouseX, mouseY, 25);
  circle(mouseX, mouseY, 25);
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 0;
}

function mouseReleased(){
  if(cirState == CLICK)
    play('r.mp4')
  if(boxState == CLICK)
    play('r.mp4')
}
function play(url) {
  if(isRolling == false){
    let vid = document.getElementById("myVid")
    vid.setAttribute("style","width:100vw; height:100vh")
    vid.play();
    
    isRolling = true;
  }
}

