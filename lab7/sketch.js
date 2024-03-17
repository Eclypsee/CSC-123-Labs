let flags = [];
let numFlags = 20;
let flagX = [];
let flagY = [];
let flagColor = [];
let fscale = 0.15;

let tankNum = 6;
let tankX = []
let tankY = []
let tankDX = []
let tankDY = []

function setup() {
    createCanvas(600, 600);
    background(200, 100, 50);
    frameRate(60);
    for(let i = 0; i<tankNum; i++){
        tankX[i] = random(width/4, 3*width/4);
        tankY[i] = random(height/4, 3*height/4);
        tankDX[i] = random(-10, 10)
        tankDY[i] = random(-10, 10)
    }


    for(let i = 0; i<numFlags; i++){
        flagX[i] = random(0, width-fscale*1000/2);
    }

    for(let i = 0; i<numFlags; i++){
        flagY[i] = random(0, height-fscale*600/2);
    }
    for(let i = 0; i<numFlags; i++){
        flagColor[i] = color(random(100, 255), 0, 0);
    }
    for(let i = 0; i<numFlags; i++){
        if(i%2==0){
            flags[i] = revolution(flagX[i], flagY[i], fscale, flagColor[i]);
            
        }else{
            flags[i] = socialcreditflag(flagX[i], flagY[i], fscale, flagColor[i]);
        }
    }
    
}

function draw() {
    background(200, 100, 50);
    frameRate(60);

    for(let i = 0; i<numFlags; i++){
        if(i%2==0){
            flags[i] = revolution(flagX[i], flagY[i], fscale, flagColor[i]);
            
        }else{
            flags[i] = socialcreditflag(flagX[i], flagY[i], fscale, flagColor[i]);
        }
    }
    
    for(let i = 0; i<tankNum; i++){
        tankX[i]+=tankDX[i];
        tankY[i]+=tankDY[i];
        if(tankX[i]>width||tankX[i]<0){
            tankDX[i] = -tankDX[i];
        }
        if(tankY[i]>height||tankY[i]<0){
            tankDY[i] = -tankDY[i];
        }
        drawTank(tankX[i],tankY[i], random(0.3, 0.6), random(2*PI));
    }
    
}


function revolution(x, y, s, c) {
    push();
        translate(x, y);
        scale(s);
        //background of flag
        fill(c)
        stroke(0)
        strokeWeight(5);
        rect(0, 0, 500, 300);

        noStroke();

        //sickle
        push();
            translate(200, 150);
            rotate(PI/4);
            fill(255, 255, 0);
            rect(0, 0, 27, 70);
            push();
                translate(0, 20)
                beginShape();
                bezier(0, 0, 100, -50, 100, -130, 0, -180);
                fill(c);
                bezier(0, 0, 60, -70, 60, -130, 0, -180);
                endShape();
            pop();
        pop();

        //hammer
        push();
            translate(199, 90);
            scale(0.9)
            rotate(-PI/4)
            fill(255, 255, 0);
            rect(0, 0, 30, 200);
            quad(-30, 0, 50, 0, 75, 30, -30, 30);
        pop();
        
    pop();
    
}

function socialcreditflag(x, y, s, c){
    push();
        translate(x, y);
        scale(s);
        //background of flag
        fill(c);
        stroke(0);
        strokeWeight(5);
        rect(0, 0, 500, 300);

        noStroke();

        //stars of ruin
        fill(255, 255, 0);
        push();
            translate(90, 90)
            rotate(-PI/11)
            stars(0, 0, 13, 40, 5);
        pop();

        push();
            scale(0.8);
            translate(20, 20)
            push();
                scale(0.5)
                translate(350, 70)
                rotate(-PI/11)
                stars(0, 0, 13, 40, 5);
            pop();

            push();
                scale(0.5)
                translate(420, 210)
                rotate(-PI/11)
                stars(0, 0, 13, 40, 5);
            pop();

            push();
                scale(0.5)
                translate(420, 130)
                rotate(-PI/11)
                stars(0, 0, 13, 40, 5);
            pop();

            push();
                scale(0.5)
                translate(350, 280)
                rotate(-PI/11)
                stars(0, 0, 13, 40, 5);
            pop();
        pop();
        
    pop();
}


function stars(x, y, inrad, outrad, pnum) {
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