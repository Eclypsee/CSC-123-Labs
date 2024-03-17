
class Tank {
    constructor(x, y, s, scale, rotation, color){
        this.x = x;
        this.y = y;
        this.speed = s;
        this.s = scale;
        this.r = rotation;
        this.c = color;
        this.trails = []; 
        this.maxTrails = 500;
    }
    update(){
        this.trails.push({ x: this.x, y: this.y });

        if (this.trails.length > this.maxTrails) {
            this.trails.shift(); 
        }
        this.dx = this.speed * Math.cos(this.r + Math.PI); 
        this.dy = this.speed * Math.sin(this.r + Math.PI); 
    
        // Update position
        this.x += this.dx;
        this.y += this.dy;

        if(this.x > width || this.x < 0){
            this.r = Math.PI - this.r; 
        }
        if(this.y > height || this.y < 0){
            this.r = -this.r; 
        }
    }    
    draw(){
        for (const trail of this.trails) {
            fill(30, 30, 30, 50); // Dirt color
            noStroke();
            circle(trail.x, trail.y, 15); // Draw a small circle for the trail
        }
        stroke(0);
        strokeWeight(2);
        push();
        translate(this.x, this.y);
        scale(this.s);
        rotate(this.r);
        //chassis
        fill(this.c);//181, 169, 31
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
}
