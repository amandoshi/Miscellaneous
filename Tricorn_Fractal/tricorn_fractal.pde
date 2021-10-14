int maxIterations = 1000;

void setup() {
    size(900, 900);
    colorMode(HSB, 1);
}

void draw() {
    loadPixels();
    for (int j = 0; j < height; j++) {
        for (int i = 0; i < width; i++) {
            int pxIndex = i + j * width;
            
            float x = map(i, 0, width - 1, -2, 2);
            float y = map(j, 0, height - 1, -2, 2);
            
            float zx = x;
            float zy = y;
            
            int iteration = 0;
            
            while(zx * zx + zy * zy < 4 && iteration < maxIterations) {
                float xtemp = zx * zx - zy * zy + x;
                zy = -2 * zx * zy + y;
                zx = xtemp;
                
                iteration++;
            }
            
            if (iteration == maxIterations) {
                pixels[pxIndex] = color(0);
            } else {
                float hue = sqrt(float(iteration) / maxIterations);
                pixels[pxIndex] = color(hue, 255, 255);
            }
        }
    }
    updatePixels();
    noLoop();
}