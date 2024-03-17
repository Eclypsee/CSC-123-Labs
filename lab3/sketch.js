//Otoniel Valencia

let unit = visualViewport.width/25;
function setup() {
    createCanvas(visualViewport.width, visualViewport.height);
    frameRate(30);
    drawBackrgound();

    //declares the player and AI
    p = new player();
    ai = new player();
    ai.isPlayer = false;
    ai.speedx = random(-ai.maxSpeed, ai.maxSpeed);
    ai.speedy = random(-ai.maxSpeed, ai.maxSpeed);;
}
function draw() {

    //setup canvas and the background
    resizeCanvas(visualViewport.width, visualViewport.height);
    drawBackrgound();

    //player moves and display
    p.display();
    p.move();

    //moves AI
    ai.display();
    ai.move();

    //draw sand
    drawSand(visualViewport.width/12, unit, height);
    
}

//creates the player class
class player {
    constructor(){
        this.x = visualViewport.width/2;
        this.y = visualViewport.height/2;
        this.rad = unit;
        this.maxSpeed = 5;
        this.accel = 0.5;
        this.speedy = 0;
        this.speedx = 0;
        this.isPlayer = true;
    }
    move(){
        if(this.isPlayer){
            //check key presses
            if(keyIsDown(87) && this.y >= 0){//w
                if(this.speedy>(-1*this.maxSpeed))//increases speed with acceleration until it hits max speed
                this.speedy-=this.accel;
            }
            if(keyIsDown(83)){//s
                if(this.speedy<this.maxSpeed)//increases speed with acceleration until it hits max speed
                this.speedy+=this.accel;
                
            }
            if(keyIsDown(65)){//a
                if(this.speedx>(-1*this.maxSpeed))//increases speed with acceleration until it hits max speed
                this.speedx-=this.accel;
            }
            if(keyIsDown(68)){//d
                if(this.speedx<this.maxSpeed)//increases speed with acceleration until it hits max speed
                this.speedx+=this.accel;
            }

            //start friction if no key is pressed
            if(!keyIsPressed){
                //friction for y
                if(this.speedy<0)//if speed is negative(move up)
                this.speedy+=0.4*this.accel;//speed gets more positive, slows
                if(this.speedy>0)//if speed is positive(move down)
                this.speedy-=0.4*this.accel;//speed gets more negative, slows
                if(this.speedy<0.5&&this.speedy>-0.5)//if speed between small values
                this.speedy = 0;//set speed to 0
                
                //friction for x(same stuff as y)
                if(this.speedx<0)
                this.speedx+=0.4*this.accel;
                if(this.speedx>0)
                this.speedx-=0.4*this.accel;
                if(this.speedx<0.5&&this.speedx>-0.5)
                this.speedx = 0;
                
            }
            //check boundaries y(bounces the player off the sides)
            if(this.y-this.rad<=0){
                this.y=this.rad;
                this.speedy = -.3*this.speedy;
            }
            if(this.y+this.rad>=height){
                this.y=-this.rad+height;
                this.speedy = -.3*this.speedy;
            }
            //check boundaries x(bounces the player off the sides)
            if(this.x-this.rad<=0){
                this.x=this.rad+0;
                this.speedx = -.3*this.speedx;
            }
            if(this.x+this.rad>=width){
                this.x=-this.rad+width;
                this.speedx = -.3*this.speedx;
            }

            //move the player
            this.y+=this.speedy;
            this.x+=this.speedx;
        }else{//moves the AI
            
            //collision detection for the AI
            if(this.y-this.rad<=0){
                this.y=this.rad;
                this.speedy = -this.speedy;
            }
            if(this.y+this.rad>=height){
                this.y=-this.rad+height;
                this.speedy = -this.speedy;
            }
            if(this.x-this.rad<=0){
                this.x=this.rad+0;
                this.speedx = -this.speedx;
            }
            if(this.x+this.rad>=width){
                this.x=-this.rad+width;
                this.speedx = -this.speedx;
            }
            this.y+=this.speedy;
            this.x+=this.speedx;

        }

    }

    //draw it out
    display(){
        strokeWeight(0);
        //lights
        if(this.isPlayer){//draws searchlight if its a player
            fill(255, 255, 0, 90);
            push();
                let ang = Math.atan2((mouseY-this.y),(mouseX-this.x));//sets the rotation angle of the searchlight
                translate(this.x, this.y);
                rotate(ang);
                triangle(0, 0, 9*unit, -3*unit, 9*unit, 3*unit);
                push();
                translate(9*unit, 0);
                rotate(3*PI/2)
                arc(0, 0, 6*unit, 6*unit, 0, PI);
                pop();
            pop();
        }
        //body/collision box
        noFill();
        circle(this.x, this.y, 2*this.rad);
        push();
            translate(this.x, this.y)
            // if(mouseX<=this.x)
            // scale(-1, 1);

            drawSub(0, 0, 0.7*unit, this.isPlayer);
        pop();
    }
}

//draws the player submarine
function drawSub(x, y, rad, isPlayer){
    fill(204, 83, 67);
    rect(x-.9*rad, y-.8*rad, 0.7*rad, rad, 0.1*rad);
    if(isPlayer){
        fill(45, 224, 237);
    }else{
        fill(255, 0, 0);
    }
    circle(x, y, rad);
    fill(255, 255, 255);
    circle(x, y, .5*rad);
    fill(224, 151, 49);
    rect(x-rad, y-rad*.5, rad, rad, 0.1*rad);
    fill(219, 87, 31);
    rect(x-1.2*rad, y+.35*rad, rad*1.8, 0.2*rad, 0.1*rad);
    rect(x-1.2*rad, y, rad*1, 0.3*rad, 0.1*rad);
    rect(x-1.2*rad, y-0.35*rad, rad*1, 0.3*rad, 0.1*rad);
    fill(176, 159, 151);
    rect(x-1.2*rad, y-.5*rad, rad*1.8, 0.3*rad, 0.1*rad);
}

//draws the background in a grid
function drawBackrgound(){
    background(20, 33, 41);
    stroke(34, 69, 65);
    strokeWeight(2);
    for (let i = 1; i < 25; i++) {
        line(i*unit, 0, i*unit, visualViewport.height);
        for (let i = 1; i < 13; i++) {
            line(0, i*unit, visualViewport.width, i*unit);
        }
    } 
}

//draw undersea mountains
function drawSand(unitx, unity, viewy){
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
    push();
    stroke(224, 166, 32);
    fill(236, 220, 115);
    translate(p.x*0.2, 0);
    sand(6*unitx, unity, 3*unitx, viewy);
    sand(7*unitx, 2*unity, 4*unitx, viewy);
    pop();
    push();
    translate(-p.x*0.2, 0);
    sand(9*unitx, 1.5*unity, 3*unitx, viewy);
    sand(0, unity, 3*unitx, viewy);
    sand(3*unitx, 2*unity, 4*unitx, viewy);
    pop();
    push();
    translate(p.x*0.1, 0);
    sand(5*unitx, 1.5*unity, 3*unitx, viewy);
    sand(8*unitx, unity, 1*unitx, viewy);
    sand(2*unitx, 2*unity, 2*unitx, viewy);
    pop();
    push();
    translate(p.x*0.3, 0);
    sand(-2*unitx, 2*unity, 3*unitx, viewy);
    sand(11*unitx,1*unity, 4*unitx, viewy);
    sand(-5*unitx,1*unity, 4*unitx, viewy);
    pop();
}

//helps with drawing mountains
function sand(startx, h, w, viewporty){
    strokeWeight(0);
    fill(12, 35, 51);
    triangle(startx, viewporty, startx+w/2, viewporty-h, startx+w, viewporty);
    fill(40, 27, 54);
    triangle(startx+w*2/3, viewporty, startx+w/2, viewporty-h+4, startx+w, viewporty);
}