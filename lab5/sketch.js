let unit;
function setup() {
    createCanvas(visualViewport.height, visualViewport.height);
    noLoop();
    unit = width/30;
}

function draw() {
   drawBackground(unit);
   fill(100);
   for(i=0;i<40;i++){
        bush(random(width), random(height), random(0.5, 0.7), random(255), random(255), random(50, 100), random(255), random(255), random(50, 100));
   }
   for(i=0;i<4;i++){
        drawTank(random(width), random(height), random(0.6, 0.8), random(2)*PI);
   }
}

function bush(x, y, s, r1, g1, b1, r2, g2, b2){
    push();
        translate(x, y);
        scale(s)
        strokeWeight(2);
        fill(r1, g1, b1);
        spikybush(x, y, 110, 150, 10);
        noStroke();
        fill(r2, g2, b2);
        spikybush(x, y, 60, 100, 10);      
    pop();
}

function drawTank(x, y, s, r){
    stroke(0);
    strokeWeight(2);
    push();
        translate(x, y);
        scale(s);
        rotate(r)
        //chassis
        fill(181, 169, 31);
        rect(-75, -50, 150, 100, 10);

        //turret back
        fill(122, 111, 54);
        circle(30, 0, 60);

        //main turret
        fill(133, 126, 46);
        rect(-100, -5, 50, 10);
        circle(-35, 0, 30);
        rect(-30, -30, 60, 60);
        rect(-20, -30, 60, 60);
        quad(-30, -30, -30, 30, -40, 20, -40, -20);

        //hatch
        fill(166, 150, 73)
        square(-10, -10, 30);
        circle(20, -10, 20);

        //lights
        fill(255, 255, 0);
        rect(-75, -50, 10, 15, 5);
        rect(-75, 35, 10, 15, 5);
        
    pop();

}
function drawBackground(u){
    
    for(let i = 0; i < width/u; i++){
        for(let k = 0; k < width/u; k++){
            fill(random(80), random(100, 255), random(40));
            noStroke();
            rect(i*u, k*u, u, u);
        }
    }
}

function spikybush(x, y, inrad, outrad, pnum) {
    let ang = TWO_PI/pnum;
    let half = ang/2;
    beginShape();
    for (let k = 0; k < TWO_PI; k += ang) {
      let px = x+cos(k)*outrad;
      let py = y+sin(k)*outrad;
      vertex(px, py);
      px = x+cos(half+k)*inrad;
      py = y+sin(half+k)*inrad;
      vertex(px, py);
    }
    endShape(CLOSE);
}
  