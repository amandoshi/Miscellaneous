function setup() {
	createCanvas(600, 600, WEBGL);
	noFill();
}

function draw() {
	background(0);

	// rotate object
	rotateX(frameCount / 150);
	rotateY(frameCount / -90);
	rotateZ(frameCount / 120);

	for (let i = 0; i < 60; i++) {
		// set color
		let r = map(sin(frameCount / 360), -1, 1, 64, 255);
		let g = map(cos(frameCount / 180), -1, 1, 64, 255);
		let b = map(i, 0, 50, 0, 255);
		stroke(r, g, b);

		// draw 3D object
		beginShape();
		for (let j = 0; j < 360; j += 30) {
			rotate((i * j) / 10);

			let x = i * 4 * sin(map(j, 0, 360, 0, 2 * PI));
			let y = i * 4 * cos(map(j, 0, 360, 0, 2 * PI));
			let z = cos(sin((frameCount * 2 + i * 5) / 35)) * 120;

			vertex(x, y, z);
		}
		endShape(CLOSE);
	}
}
