class Boid {
	constructor(x, y) {
		// class constants
		this.maxForce = 0.2;
		this.maxSpeed = 4;
		this.perceptionRadius = 70;

		// object variables
		this.position = createVector(x, y);
		this.velocity = p5.Vector.random2D();
		this.acceleration = createVector();
	}

	draw() {
		push();

		// set drawing state
		translate(this.position.x, this.position.y);
		let j = createVector(0, -1);
		rotate(j.angleBetween(this.velocity));

		// draw boid
		fill(255, 100);
		triangle(-6, 0, 6, 0, 0, -20);

		pop();
	}

	edgeCollision() {
		// xEdge
		if (this.position.x < 0) {
			this.position.x = width;
		} else if (this.position.x > width) {
			this.position.x = 0;
		}

		// yEdge
		if (this.position.y < 0) {
			this.position.y = height;
		} else if (this.position.y > height) {
			this.position.y = 0;
		}
	}

	flock(boids) {
		this.acceleration.mult(0);
		let counter = 0;

		let desiredAllignment = createVector();
		let desiredPosition = createVector();
		let desiredSeparation = createVector();

		for (const boid of boids) {
			const d = sqrt(
				pow(
					min(
						abs(this.position.x - boid.position.x),
						width - abs(this.position.x - boid.position.x)
					),
					2
				) +
					pow(
						min(
							abs(this.position.y - boid.position.y),
							height - abs(this.position.y - boid.position.y)
						),
						2
					)
			);

			if (
				boid != this &&
				d < this.perceptionRadius &&
				abs(this.velocity.angleBetween(boid.velocity)) < 2
			) {
				// allignment
				desiredAllignment.add(boid.velocity);

				// cohesion
				desiredPosition.add(boid.position);

				// separation
				let boidToThis = p5.Vector.sub(this.position, boid.position);
				boidToThis.div(d ** 2);
				desiredSeparation.add(boidToThis);

				counter++;
			}
		}

		if (counter) {
			// allignment
			desiredAllignment.div(counter);
			desiredAllignment.setMag(this.maxSpeed);
			var steeringAllignment = p5.Vector.sub(desiredAllignment, this.velocity);
			steeringAllignment.limit(this.maxForce);

			// cohesion
			desiredPosition.div(counter);
			let desiredCohesion = p5.Vector.sub(desiredPosition, this.position);
			desiredCohesion.setMag(this.maxSpeed);
			var steeringCohesion = p5.Vector.sub(desiredCohesion, this.velocity);
			steeringCohesion.limit(this.maxForce);

			// separation
			desiredSeparation.div(counter);
			desiredSeparation.setMag(this.maxSpeed);
			var steeringSeparation = p5.Vector.sub(desiredSeparation, this.velocity);
			steeringSeparation.limit(this.maxForce);

			// steering force size
			steeringSeparation.mult(separationSlider.value());
			steeringCohesion.mult(cohesionSlider.value());
			steeringAllignment.mult(allignSlider.value());

			// add steering
			this.acceleration.add(steeringAllignment);
			this.acceleration.add(steeringCohesion);
			this.acceleration.add(steeringSeparation);
		}
	}

	update() {
		// update velocity
		this.velocity.add(this.acceleration);
		this.velocity.setMag(this.maxSpeed);

		// update position
		this.position.add(this.velocity);
		this.edgeCollision();
	}
}
