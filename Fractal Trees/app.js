let angle;
let slider;

function setup() {
	createCanvas(600, 600);
	stroke(255);

	slider = createSlider(0, PI / 4, PI / 8, 0.01);
}

function draw() {
	background(0);

	translate(width / 2, height);
	angle = slider.value();

	// draw fractal tree
	branch(angle, 120, 6);
}

function branch(angle, size, weight) {
	strokeWeight(weight);
	line(0, 0, 0, -size);
	translate(0, -size);

	// draw sub-branches
	if (size > 4) {
		for (let i = 0; i < 2; i++) {
			push();
			rotate(angle * (-1) ** i);
			branch(angle * 1.03, size * 0.75, weight * 0.75);
			pop();
		}
	} else {
		// draw apples
		fill(255, 0, 0, 200);
		ellipse(0, 0, 3, 3);
	}
}
