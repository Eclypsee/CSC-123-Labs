
let offset1 = 20;
let offeset1inc = -0.5;
let offset2 = -10;
let offeset2inc = 0.25;
let offset3 = -17;
let offeset3inc = 0.5;
let bub = [];
let colorinc;
let ogcolor;
let newcolor;
function setup() {
  createCanvas(visualViewport.width, visualViewport.height);
  frameRate(30);
  for (let i = 0; i < 100; i++) {
    bub[i] = new Bubbles();
  }
  ogcolor = color(130, 174, 179);
  newcolor = color(0, 255, 191);
  colorinc = 0;
  background(ogcolor)
}

function draw() {
  //set stats

  let viewx = visualViewport.width;
  let viewy = visualViewport.height;
  let ox = viewx*0.5 - 0.05*(mouseX-width/2);
  let oy = viewy*0.4 - 0.1*(mouseY-height*0.4);


  resizeCanvas(viewx, viewy);

  //fading background
  background(lerpColor(ogcolor, newcolor, colorinc));
  colorinc += 0.005;
  if(colorinc >= 1){
    colorinc = 0;
    ogcolor = newcolor;
    newcolor = color(random(255),random(255),random(255));
  }

  //bubbles
  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = color(255, 255, 255);
  moveBubbles();
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 0;

  push();
    //set var
    let bx = -100*Math.sqrt(2)/2;
    let by = 100*Math.sqrt(2)/2;
    let bdist = 100*Math.sqrt(2);

    //body
    translate(ox, oy);
    strokeWeight(4);
    stroke(99, 215, 219);
    fill(174, 242, 245);
    arc(0, 0, 200, 200, 3*PI/4, PI/4, CHORD);//diameter is 200
    bezier(-0.5*100, -100*(Math.sqrt(3)/2), -30,-50, 30, -50, 0.5*100, -100*(Math.sqrt(3)/2));
    fill(111, 232, 232);
    circle(30, -30, 30);
    circle(-45, 30, 50);
    circle(50, 30, 60);
    circle(-50, -40, 10);
  
    //tentacles
    stroke(99, 215, 219);
    fill(201, 170, 141);
    drawLegs(bx+bdist/5, by, offset1, 275);
    offset1+=offeset1inc;
    if(offset1==-20 || offset1==20){offeset1inc=offeset1inc*-1;}
    drawLegs(bx+2.5*bdist/5, by, offset2, 275);
    offset2+=offeset2inc;
    if(offset2==-10 || offset2==10){offeset2inc=offeset2inc*-1;}
    drawLegs(bx+4*bdist/5, by, offset3, 275);
    offset3+=offeset3inc;
    if(offset3==-17 || offset3==17){offeset3inc=offeset3inc*-1;}

    //muscles
    stroke(99, 215, 219);
    fill(120, 172, 204);
    for (let i = 0; i < 5; i++) {
      arc(bx+bdist/10+i*bdist/5, by, bdist/5, bdist/5, 0, PI, CHORD);
    }

    //draw secondary tentacles
    noFill();
    strokeWeight(2);
    stroke(255, 255, 255);
    drawLegs(bx, by, -17, 180);
    drawLegs(bx+bdist/5, by, 10, 200);
    drawLegs(bx+2*bdist/5, by, -5, 200);
    drawLegs(bx+3*bdist/5, by, 8, 200);
    drawLegs(bx+4*bdist/5, by, 17, 200);
    drawLegs(bx+bdist, by, 10, 180);

    //draw eyes
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = color(255, 255, 255);
    fill(255, 255, 255);
    ellipse(bx+bdist/4+0.02*(mouseX-ox), by-80+0.02*(mouseY-oy), 17, 27);
    ellipse(bx+3*bdist/4+0.02*(mouseX-ox), by-80+0.02*(mouseY-oy), 17, 27);
    ellipse(bx+bdist/4+0.02*(mouseX-ox), by-80+0.02*(mouseY-oy), 17, 27);
    ellipse(bx+3*bdist/4+0.02*(mouseX-ox), by-80+0.02*(mouseY-oy), 17, 27);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 0;
  pop();

  //sand
  push();
    stroke(224, 166, 32);
    fill(236, 220, 115);
    translate(mouseX*0.2, 0);
    let unitx = viewx/12;
    let unity = viewy/12;
    sand(6*unitx, unity, 3*unitx, viewy);
    sand(7*unitx, 2*unity, 4*unitx, viewy);
    sand(9*unitx, 1.5*unity, 3*unitx, viewy);
    sand(0, unity, 3*unitx, viewy);
    sand(3*unitx, 2*unity, 4*unitx, viewy);
    sand(5*unitx, 1.5*unity, 3*unitx, viewy);
    sand(8*unitx, unity, 1*unitx, viewy);
    sand(2*unitx, 2*unity, 2*unitx, viewy);
    sand(-2*unitx, 2*unity, 3*unitx, viewy);
    sand(11*unitx,1*unity, 4*unitx, viewy);
    sand(-5*unitx,1*unity, 4*unitx, viewy);
  pop();
  
  
}

function moveBubbles() {
  for (let i = 0; i < 100; i++) {
    bub[i].display();
    bub[i].move();
  }
}

function sand(startx, h, w, viewporty){
  fill(236, 220, 115);
  triangle(startx, viewporty, startx+w/2, viewporty-h, startx+w, viewporty);
  fill(216, 196, 104);
  triangle(startx+w*2/3, viewporty, startx+w/2, viewporty-h+4, startx+w, viewporty);
}

function drawLegs(bx, by, offsets, len){
  beginShape();
    curveVertex(bx, by);
    curveVertex(bx, by);
    curveVertex(bx-offsets, 0.4*len);
    curveVertex(bx+offsets, 0.472*len);
    curveVertex(bx-offsets, 0.582*len);
    curveVertex(bx+offsets, 0.69*len);
    curveVertex(bx-offsets, 0.764*len);
    curveVertex(bx, len);
    curveVertex(bx, len);
    endShape();
}

class Bubbles {
  constructor() {
    this.horizontal = random(visualViewport.width);
    this.vertical = random(visualViewport.height);
    this.diam = random(5, 40);
    this.speed = random(1, 5);
    this.a = random(0, 150);
    this.r = random(0, 64);
    this.g = random(90, 255);
    this.b = random(128, 255);
  }
  move() {
    this.vertical = this.vertical - this.speed;
    if (this.vertical < 0) {
      this.vertical = random(visualViewport.height, 0);
    }
  }
  display() {
    //bubbles
    strokeWeight(4);
    stroke(this.r, this.g, this.b, this.a);
    fill(174, 242, 245, this.a);
    circle(this.horizontal, this.vertical, this.diam);
  }
}
