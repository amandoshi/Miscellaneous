class Agent {
    float x, y;

    Agent(float xStart, float yStart) {
        x = xStart;
        y = yStart;
    }

    void draw() {
        push();
        stroke(255);
        point(x, y);
        pop();
    }

    void update() {
        int state = (int) random(0,4);
        if (state == 0) {
            x += 1;
        } else if (state == 1) {
            x -= 1;
        } else if (state == 2) {
            y += 1;
        } else if (state == 3) {
            y -= 1;
        }
        
        x = constrain(x, 0, width-1);
        y = constrain(y, 0, height-1);
    }
}