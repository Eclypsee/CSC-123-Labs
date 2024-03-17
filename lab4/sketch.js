
function setup() {
    createCanvas(visualViewport.height, visualViewport.height);
    noLoop();
}

function draw() {
    

    sunsetYay(0, 0, 0.5, color(0, 30, 87), color(255, 255, 255));
    sunglasses(0,0,width/2, 0, 255, 255, 100);
    drawBalloon(0.25*width/500, width/4, height/4, 100, 0, 0);

    sunsetYay(width/2, 0, 0.5, color(0, 30, 87), color(255, 255, 255));
    sunglasses(width/2,0,width/2, 0, 255, 0, 100);
    drawBalloon(0.25*width/500, 3*width/4, height/4, 0, 100, 100);
    
    sunsetYay(0, height/2, 0.5, color(0, 30, 87), color(255, 255, 255));
    sunglasses(0,width/2,width/2, 255, 255, 0, 100);
    drawBalloon(0.25*width/500, width/4, 3*height/4, 100, 0, 100);

    sunsetYay(width/2, height/2, 0.5, color(0, 30, 87), color(255, 255, 255));
    sunglasses(width/2,height/2,width/2, 255, 0, 0, 100);
    drawBalloon(0.25*width/500, 3*width/4, 3*height/4, 0, 100, 0);
    

}
function sunglasses(x, y, w, r, g, b, a){
    noStroke();
    fill(r, g, b, a);
    rect(x, y, w, w);
}

function sunsetYay(x, y, s, c1, c2){//gradient
    push();
        translate(x, y);
        scale(s);   
        for (let i = 0; i < height; i++) {
            let hehehehaw = i/height;//way more simplified than whatever p5 documentation was trying to do lmao
            console.log(hehehehaw);
            let c = lerpColor(c1, c2, hehehehaw);
            stroke(c);
            line(0, i, x + width, i);
        }
        for(let k = 0; k<200; k++){
            fill(255);
            circle(random(0, width), random(0, height), random(width/200, width/70)); 
        }
        fill(255);
        circle(width/6, width/6, width/5); 
        noStroke(); 
        mound(0, width/5.5, width/6, height);
        mound(width/6, 1.5*width/6, 4*width/6, height);
        mound(0.8*width/6, 1.9*width/6, 0.8*width/6, height);
        mound(4*width/6, width/6, 3*width/6, height);
        mound(6.2*width/6, 1.7*width/6, 2*width/6, height);
    pop();
}

function drawBalloon(size, ox, oy, redcol, greencol, bluecol){
    push();
        translate(ox, oy);
        scale(size);
        //body
        let rad = 200;
        
        noStroke();
        fill(redcol, greencol, bluecol);
        circle(0, 0, 2*rad);
        fill(redcol*1.5, greencol*1.5, bluecol*1.5);
        circle(0, 0, 1.7*rad);
        fill(redcol*2, greencol*2, bluecol*2);
        circle(0, 0, 1.3*rad);
        fill(redcol*2.5, greencol*2.5, bluecol*2.5);
        circle(0, 0, rad/1.2);
        
        //ropes
        noFill();
        strokeWeight(3);
        stroke(166, 138, 101);
        quad(-.5*rad, rad*Math.sqrt(3)/2, .5*rad, rad*Math.sqrt(3)/2, 30, rad*1.5, -30, rad*1.5);
        line(30, rad*1.5, 0, rad*Math.sqrt(3)/2);
        line(-30, rad*1.5, 0, rad*Math.sqrt(3)/2);
        line(30, rad*1.5, rad/4, rad*Math.sqrt(3)/2);
        line(-30, rad*1.5, -rad/4, rad*Math.sqrt(3)/2);
        //bottom two points are (30, rad*1.5) (-30, rad*1.5)
        //top point is (-.5*rad, rad*Math.sqrt(3)/2)
        triangle(-.5*rad, rad*Math.sqrt(3)/2, -rad*Math.sqrt(3)/2, rad*.5, 0, rad*.5);
        triangle(.5*rad, rad*Math.sqrt(3)/2, rad*Math.sqrt(3)/2, rad*.5, 0, rad*.5);
        line(0, rad*.5, 0, rad*Math.sqrt(3)/2);
        line(-.5*rad, rad*Math.sqrt(3)/2, -rad/2, rad*.5);
        line(.5*rad, rad*Math.sqrt(3)/2, rad/2, rad*.5);

        //cabin
        fill(120, 87, 44);
        stroke(64, 46, 22);
        square(-30, rad*1.5, 60);
        fill(110, 79, 37);
        square(-20, rad*1.5, 40);

    pop();
}

function mound(startx, h, w, viewporty){
    fill(75, 176, 53);
    triangle(startx, viewporty, startx+w/2, viewporty-h, startx+w, viewporty);
    fill(44, 115, 29);
    triangle(startx+w*2/3, viewporty, startx+w/2, viewporty-h+4, startx+w, viewporty);
  }