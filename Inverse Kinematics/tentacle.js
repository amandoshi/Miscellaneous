class Tentacle {
	constructor(numOfSegments, length, baseX, baseY) {
		// fixed points
		this.base = createVector(baseX, baseY);

		// segment length
		this.length = length;

		// segments
		this.segments = new Array(numOfSegments);
		this.setupSegments(numOfSegments);
	}

	draw() {
		// segments
		for (const segment of this.segments) {
			segment.draw();
		}

		// base
		push();
		fill(255, 0, 0);
		stroke(0);
		ellipse(this.base.x, this.base.y, 15);
		pop();
	}

	setupSegments(numOfSegments) {
		for (let i = 0; i < numOfSegments; i++) {
			this.segments[i] = new Segment(this.length);
		}
	}

	update(x, y) {
		// segments
		this.segments[0].update(x, y);
		for (let i = 1; i < this.segments.length; i++) {
			const parentSegment = this.segments[i - 1];
			this.segments[i].update(parentSegment.start.x, parentSegment.start.y);
		}

		// chain segments to base
		const baseDirection = p5.Vector.sub(
			this.base,
			this.segments[this.segments.length - 1].start
		);
		for (let i = 0; i < this.segments.length; i++) {
			this.segments[i].translate(baseDirection);
		}
	}
}
