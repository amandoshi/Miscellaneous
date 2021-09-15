let approximation;
const canvasSize = 600;
let inside = 0;
let iterations;
let total = 0;

function setup() {
	// canvas settings
	createCanvas(canvasSize, canvasSize);
	background(0);
	noStroke();

	// text for approximation
	approximation = createP();
	approximation.style("font-size", "30px");

	// slider
	iterations = createSlider(1, 500, 1);
}

function draw() {
	for (let i = 0; i < iterations.value(); i++) {
		total += 1;

		// random point
		const x = random();
		const y = random();

		if (pow(x, 2) + pow(y, 2) < 1) {
			// inside sector
			fill(255, 0, 0, 100);
			inside += 1;
		} else {
			// outside sector
			fill(255, 255, 255, 100);
		}

		// draw point
		ellipse(x * canvasSize, y * canvasSize, 1);
	}

	approximation.html((inside / total) * 4);

	// draw circle
	push();
	noFill();
	stroke(0);
	strokeWeight(3);
	ellipse(0, 0, canvasSize * 2);
	pop();
}
