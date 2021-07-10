function setup() {
	createCanvas(600, 600);
	strokeWeight(8);
	noFill();
}

function draw() {
	background(0);

	// get time
	const now = new Date();
	const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
	const minutes = now.getMinutes() + seconds / 60;
	const hours = now.getHours() + minutes / 60;

	// calculate current angles from 12 (radians)
	const secondAngle = (seconds / 60) * 2 * PI - PI / 2;
	const minuteAngle = (minutes / 60) * 2 * PI - PI / 2;
	const hourAngle = ((hours % 12) / 12) * 2 * PI - PI / 2;

	// seconds
	drawHand(150, secondAngle, [0, 255, 0], 200);
	stroke(0, 255, 0, 150);
	arc(width / 2, height / 2, 460, 460, -PI / 2, secondAngle);

	// draw minute hand
	drawHand(120, minuteAngle, [0, 0, 255], 200);
	stroke(0, 0, 255, 150);
	arc(width / 2, height / 2, 430, 430, -PI / 2, minuteAngle);

	// draw hour hand
	drawHand(100, hourAngle, [255, 0, 0], 200);
	stroke(255, 0, 0, 150);
	arc(width / 2, height / 2, 400, 400, -PI / 2, hourAngle);

	// clock centre
	stroke(255);
	ellipse(width / 2, height / 2, 5, 5);
}

function drawHand(size, angle, color, opacity) {
	let direction = p5.Vector.fromAngle(angle, size);
	stroke(color[0], color[1], color[2], opacity);
	line(
		width / 2,
		height / 2,
		width / 2 + direction.x,
		height / 2 + direction.y
	);
}
