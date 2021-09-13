// let a = 0;
// const r = 150;
// let wave = new Array();
// let slider;

let angle = 0;
const size = 100;
let slider;
let wave = new Array();

function setup() {
	createCanvas(1200, 600);
	slider = createSlider(1, 20, 5);
}

function draw() {
	background(0);
	translate(250, height / 2);

	// -------------------CIRCLES-------------------
	push();
	noFill();
	stroke(255, 180);

	let x = 0;
	let y = 0;
	for (let i = 0; i < slider.value(); i++) {
		const prevX = x;
		const prevY = y;
		const n = i * 2 + 1;
		const radius = size * (4 / (n * PI));

		// draw circle
		ellipse(x, y, radius * 2);
		push();
		fill(255, 0, 0, 100);
		stroke(255, 0, 0, 100);
		ellipse(x, y, 3);
		pop();

		// new coords
		x += radius * cos(n * angle);
		y += radius * sin(n * angle);

		// line connecting circle centers
		line(prevX, prevY, x, y);
	}
	pop();

	// -------------------WAVE-------------------
	wave.unshift(y);
	if (wave.length > 650 / 2) {
		wave.pop();
	}

	push();
	noFill(0);
	translate(300, 0);
	stroke(255);

	beginShape();
	for (let i = 0; i < wave.length; i++) {
		vertex(i * 2, wave[i]);
	}
	endShape();

	// line connecting circles to wave
	stroke(255, 0, 0, 200);
	line(x - 300, y, 0, wave[0]);

	pop();

	angle -= 0.05;
}
