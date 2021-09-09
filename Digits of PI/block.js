class Block {
	constructor(size, posX, posY, speed, mass) {
		this.mass = mass;
		this.pos = createVector(posX, posY);
		this.size = size;
		this.v = createVector(-1, 0);
		this.v.setMag(speed);
	}

	draw() {
		fill(255);
		rect(this.pos.x, this.pos.y, this.size);
	}

	collide(block2) {
		if (
			!(
				this.pos.x < block2.pos.x + block2.size &&
				this.pos.x + this.size > block2.pos.x
			)
		) {
			return;
		}

		const m1 = this.mass;
		const m2 = block2.mass;

		const u1 = this.v.x;
		const u2 = block2.v.x;

		const v1 = ((m1 - m2) / (m1 + m2)) * u1 + ((2 * m2) / (m1 + m2)) * u2;
		const v2 = ((2 * m1) / (m1 + m2)) * u1 + ((m2 - m1) / (m1 + m2)) * u2;

		this.v.x = v1;
		block2.v.x = v2;

		collisions += 1;
	}

	update() {
		this.pos.add(this.v);
		this.wallCollide();
	}

	wallCollide() {
		if (this.pos.x < 0) {
			this.v.mult(-1);
			collisions += 1;
		}
	}
}
