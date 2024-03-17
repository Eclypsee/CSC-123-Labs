

let tankNum = 6;
let tanks = [];
let TianShang;
function preload() {
    TianShang = loadImage('https://i.kym-cdn.com/entries/icons/original/000/041/815/cover3.jpg')
}
function setup() {
    createCanvas(600, 600);
    frameRate(60);
    for(let f=0;f<tankNum;f++){
        tanks[f] = new Tank(random(width), random(height), random(1,5), random(0.3, 0.6), random(2*PI), color(random(100,190),random(100,170),random(30,80)));
    }
}

function draw() {
    for(let j=0;j<10;j++){
        for(let i=0;i<5;i++){
            if((i+j)%2==0){
                revolution(i*500*0.24, j*250*0.24, 0.24, color(150,50,50));
            }else{
                socialcreditflag(i*500*0.24, j*250*0.24, 0.24, color(180,50,50));
            }
        }
    }
    tint(255, 40); // Display at half opacity
    TianShang.resize(600, 600);
    image(TianShang, 0, 0);
    for(let m=0;m<tankNum;m++){
        tanks[m].update();
        tanks[m].draw();
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
        rect(0, 0, 500, 250);

        noStroke();

        //sickle
        push();
            translate(200, 120);
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
            translate(199, 60);
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
        rect(0, 0, 500, 250);

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
  
