int minX = -2;
int maxX = 1;
int minY = -1;
int maxY = 1;
int maxIterations = 100;

void setup() {
    size(1200, 800);

    loadPixels();
    for (int i = 0; i < width; i++) {
        for (int j = 0; j < height; j++) {
            float x = map(i, 0, width - 1, minX, maxX);
            float y = map(j, 0, height -1, minY, maxY);
            
            // a + bi
            float a = x;
            float b = y;

            int n = 0;
            for (; n < maxIterations; n++) {
                float tempA = a * a - b * b + x;
                float tempB = 2.0 * a * b + y;
                
                a = tempA;
                b = tempB;

                if (a * a + b * b > 160.0) {
                    break;
                }
            }

            if (n == maxIterations) {
                pixels[i + j * width] = color(0);
            } else if (n > 30) {
                float strength = sqrt(map(n, 0, maxIterations-31, 0, 1));
                pixels[i + j * width] = color(strength * 150, strength * 200, strength * 200);
            } else {
                float strength = sqrt(map(n, 0, maxIterations-1, 0, 1));
                pixels[i + j * width] = color(0, strength*150, strength * 250);
            }

        }
    }
    updatePixels();
}

