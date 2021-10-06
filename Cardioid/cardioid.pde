int total = 200;
int radius;
float factor = 0;

void setup() {
    size(640, 640);
    
    radius = width / 2 - 20;
}

void draw() {
    factor += 0.01;
    background(0);
    translate(width / 2, height / 2);

    float angle = TWO_PI / (float) total;

    for (int i = 0; i < total; i++) {
        float x1 = -cos(angle * i) * radius;
        float y1 = sin(angle * i) * radius;
        
        float x2 = -cos(angle * i * factor) * radius;
        float y2 = sin(angle * i * factor) * radius;

        stroke(255);
        line(x1, y1, x2, y2);

    }

    noFill();
    ellipse(0,0,radius * 2, radius * 2);
}   