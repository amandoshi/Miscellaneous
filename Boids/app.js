let boids = new Array();
const numBoids = 100;
let cohesionSlider;
let separationSlider;
let allignSlider;

function setup() {
	createCanvas(1000, 600);

	for (let i = 0; i < numBoids; i++) {
		boids.push(new Boid(random(width), random(height)));
	}

	allignSlider = createSlider(0, 2, 1, 0.1);
	cohesionSlider = createSlider(0, 2, 1, 0.1);
	separationSlider = createSlider(0, 2, 1.2, 0.1);
}

function draw() {
	background(0);

	// -------------------LOGIC-------------------

	for (const boid of boids) {
		boid.flock(boids);
	}

	for (const boid of boids) {
		boid.update();
	}

	// -------------------DRAW-------------------

	for (const boid of boids) {
		boid.draw();
	}
}
