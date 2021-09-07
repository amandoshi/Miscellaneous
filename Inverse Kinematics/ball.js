class Ball {
	constructor(posX, posY, radius, speed) {
		// radius
		this.r = radius;

		// position
		this.pos = createVector(posX, posY);

		// velocity
		this.v = createVector(
			map(random(), 0, 1, -1, 1),
			map(random(), 0, 1, -1, 1)
		);
		this.v.setMag(speed);
	}

	collision() {
		// horizontal
		if (this.pos.x > width - this.r) {
			this.pos.x = width - this.r;
			this.v.x *= -1;
		} else if (this.pos.x < this.r) {
			this.pos.x = this.r;
			this.v.x *= -1;
		}

		// vertical
		if (this.pos.y > height - this.r) {
			this.pos.y = height - this.r;
			this.v.y *= -1;
		} else if (this.pos.y < this.r) {
			this.pos.y = this.r;
			this.v.y *= -1;
		}
	}

	draw() {
		push();

		// draw outer ball
		stroke(255, 100, 100);
		fill(255, 0, 0, 100);
		ellipse(this.pos.x, this.pos.y, this.r * 4);

		// draw inner ball
		stroke(0);
		fill(255);
		ellipse(this.pos.x, this.pos.y, this.r * 2);
		pop();
	}

	update() {
		this.collision();
		this.pos.add(this.v);
	}
}
