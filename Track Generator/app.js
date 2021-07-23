let trackInner = new Array();
let trackOuter = new Array();
let spawnPoint;

const noiseMax = 5;

function setup() {
	createCanvas(1000, 600);

	setupTrack();

	// spawn point
	const startIndex = floor(trackInner.length / 2);
	const spawnX = (trackInner[startIndex][0] + trackOuter[startIndex][0]) / 2;
	const spawnY = (trackInner[startIndex][1] + trackOuter[startIndex][1]) / 2;
	spawnPoint = createVector(spawnX, spawnY);
}

function draw() {
	background(0);

	// set draw state
	noFill();
	stroke(255);

	// draw inner track
	beginShape();
	for (const vtx of trackInner) {
		vertex(vtx[0], vtx[1]);
	}
	endShape(CLOSE);

	// draw outer track
	beginShape();
	for (const vtx of trackOuter) {
		vertex(vtx[0], vtx[1]);
	}
	endShape(CLOSE);

	// draw spawn point
	push();
	noStroke();
	fill(255, 0, 0);
	ellipse(spawnPoint.x, spawnPoint.y, 8);
	pop();
}

function setupTrack() {
	for (let i = 0; i < 360; i += 15) {
		const xOffset = map(cos(radians(i)), -1, 1, 0, noiseMax);
		const yOffset = map(sin(radians(i)), -1, 1, 0, noiseMax);

		// inner track
		const r1 = map(noise(xOffset, yOffset), 0, 1, 150, 250) - 50;
		const x1 = cos(radians(i)) * r1 + width / 2;
		const y1 = sin(radians(i)) * r1 + height / 2;

		// outer track
		const r2 = r1 + 50 * 2;
		const x2 = cos(radians(i)) * r2 + width / 2;
		const y2 = sin(radians(i)) * r2 + height / 2;

		// store vertices
		trackInner.push([x1, y1]);
		trackOuter.push([x2, y2]);
	}
}
