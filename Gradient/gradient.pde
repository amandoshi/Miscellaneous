void setup() {
    size(800,600);

    loadPixels();

    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            pixels[x + y * width] = color(0, y / 2, x / 2);
        }
    }

    updatePixels();
}