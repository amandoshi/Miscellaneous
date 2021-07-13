let x = 1;
let y = 1;
let z = 1;
const sigma = 5;
const rho = 25;
let beta = 5 / 3;
const deltaTime = 0.005;
let coords = new Array();

function setup() {
	createCanvas(1000, 600, WEBGL);
	colorMode(HSB);
	noFill();
}

function draw() {
	background(0);
	scale(5);

	// change camera angle
	rotateX(frameCount / 150);
	rotateY(frameCount / 300);
	rotateZ(frameCount / 450);

	// get next vertex co-ordinate
	const { x, y, z } = lorenzFormula();

	// store new vertex co-ordinate
	coords.push(new p5.Vector(x, y, z));
	if (coords.length > 3000) {
		coords.shift();
	}

	// draw shape
	beginShape();
	stroke((frameCount / 30) % 255, 255, 255);
	for (const coord of coords) {
		vertex(coord.x, coord.y, coord.z);
	}
	endShape();
}

function lorenzFormula() {
	// https://en.wikipedia.org/wiki/Lorenz_system

	const deltaX = sigma * (y - x) * deltaTime;
	const detlaY = (x * (rho - z) - y) * deltaTime;
	const deltaZ = (x * y - beta * z) * deltaTime;

	x += deltaX;
	y += detlaY;
	z += deltaZ;

	return { x, y, z };
}
