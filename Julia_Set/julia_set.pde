float R = 1.6;
int maxIterations = 100;

float cx = -0.8;
float cy = 0.156;

void setup() {
    size(950, 950);
    colorMode(HSB, 1);
}


void draw() {
    loadPixels();
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            int pxIndex = x + y * width;
            
            float zx = map(x, 0, width - 1, -R, R);
            float zy = map(y, 0, height - 1, -R, R);
            
            int iteration = 0;
            
            while(zx * zx + zy * zy < R * R && iteration < maxIterations) {
                float xtemp = zx * zx - zy * zy;
                zy = 2 * zx * zy + cy; 
                zx = xtemp + cx;
                
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