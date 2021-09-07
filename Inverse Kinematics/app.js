let ball;
let base;
let tentacle;

function setup() {
	createCanvas(800, 600);

	// initialise objects
	ball = new Ball(width / 2, height / 2, 10, 10);
	tentacle = new Tentacle(60, 5, width / 2, height / 2);
}

function draw() {
	background(0);

	// -------------------LOGIC-------------------
	ball.update();
	tentacle.update(ball.pos.x, ball.pos.y);

	// -------------------DRAW-------------------
	ball.draw();
	tentacle.draw();
}
