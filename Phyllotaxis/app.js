const c = 4;
const pointSize = 4;
let n = 0;

function setup() {
	createCanvas(600, 600);
	background(0);
	colorMode(HSB);
}

function draw() {
	translate(width / 2, height / 2);
	for (let i = 0; i < 15; i++) {
		// -------------------LOGIC-------------------
		// polar
		const angle = n * radians(137.3);
		const radius = c * pow(n, 0.5);

		// cartesian
		const x = cos(angle) * radius;
		const y = sin(angle) * radius;

		// end loop if edge reached
		if (radius > width / 2) {
			noLoop();
		}

		n++;
		// -------------------DRAW-------------------
		fill((n * 0.04) % 255, 255, 255);
		fill(red, green, blue);
		ellipse(x, y, pointSize);
	}
}
