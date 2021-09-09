let bigBlock;
let clack;
let clackSound;
let collisions = 0;
let counter;
let smallBlock;

const digits = 3;
const iterations = 1000;
const speed = 1;

function preload() {
	// collision sound
	clack = new Audio("clack.wav");
	clack.load();
}

function setup() {
	createCanvas(800, 300);

	// blocks
	bigBlock = new Block(
		180,
		200,
		height - 180,
		speed / iterations,
		pow(100, digits - 1)
	);
	smallBlock = new Block(25, 50, height - 25, 0, 1);

	// counter
	counter = createP();
	counter.style("font-size", "50px");
}

function draw() {
	// -------------------LOGIC-------------------
	let prevCollisions = collisions;

	// update blocks
	for (let i = 0; i < iterations; i++) {
		bigBlock.update();
		smallBlock.update();
		bigBlock.collide(smallBlock);
	}

	// update collision counter
	counter.html(parseInt(collisions));

	// play clack if collision
	if (prevCollisions !== collisions) {
		clack.cloneNode(true).play();
	}

	// -------------------DRAW-------------------
	background(0);
	bigBlock.draw();
	smallBlock.draw();
}
