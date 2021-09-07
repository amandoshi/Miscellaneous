class Segment {
	constructor(length) {
		this.angle = 0;
		this.length = length;

		// position
		this.start = createVector();
		this.end = createVector();
		this.end.setMag(length);
	}

	calculateEnd() {
		const dx = this.length * cos(this.angle);
		const dy = this.length * sin(this.angle);

		// set end coordinates
		this.end.set(this.start.x + dx, this.start.y + dy);
	}

	calculateStart(dirX, dirY) {
		const target = createVector(dirX, dirY);
		let direction = p5.Vector.sub(target, this.start);

		// set angle
		this.angle = direction.heading();

		// set start coordinates
		direction.setMag(this.length);
		direction.mult(-1);
		direction.add(target);
		this.start.set(direction.x, direction.y);
	}

	draw() {
		push();
		stroke(255);
		line(this.start.x, this.start.y, this.end.x, this.end.y);
		pop();
	}

	translate(v) {
		this.start.add(v);
		this.end.add(v);
	}

	update(dirX, dirY) {
		this.calculateStart(dirX, dirY);
		this.calculateEnd();
	}
}
