let a=0
function setup() {
  createCanvas(400, 400,WEBGL);
}

function draw() {
  background(0);
  rotateY(frameCount/20);
  rotateX(frameCount/40);
  rotateZ(frameCount/50);
  normalMaterial();
  strokeWeight(10);
  beginShape(LINES);
  vertex(-70, 30, 30);
  vertex(-30, -30, 30);
  vertex(30, 30, 30);
  vertex(30, -30, 0);
  endShape();
  sphere(20);
  
}