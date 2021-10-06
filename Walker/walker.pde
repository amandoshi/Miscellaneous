Agent walker;

void setup() {
    size(1000,600);
    background(0);
    
    walker = new Agent(width/2, height/2);
    frameRate(60*30);
}

void draw() {
    walker.update();
    walker.draw();
}