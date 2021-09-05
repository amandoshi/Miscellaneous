let board = new Array();
let canvas;
let cellSize;
let gameOver = false;
const gridOffset = 25;

// board spots
const ai = 1;
const empty = 0;
const human = -1;

// players
const players = { 1: "X", "-1": "O" };
let currentPlayer = ai;

function setup() {
	canvas = createCanvas(600, 600);
	canvas.mousePressed(humanMove);

	// populate board
	for (let i = 0; i < 3; i++) {
		const row = new Array(3).fill(empty);
		board.push(row);
	}

	// cell spacing (pixels)
	cellSize = width / 3;

	// text settings
	textAlign(CENTER, CENTER);
	textSize(128);
}

function draw() {
	// -------------------LOGIC-------------------

	// check game over
	const winner = getWinner(board);
	if (winner != null) {
		let msg;
		if (winner == 0) {
			msg = "Tie!";
		} else {
			msg = `Winner: ${players[winner.toString()]}`;
		}

		// display result
		let result = createP(msg);
		result.style("font-size", "32pt");

		// end game
		gameOver = true;
		noLoop();
	}

	// ai move
	if (currentPlayer == ai && !gameOver) {
		// predict next move
		const { i, j } = bestMove();

		// move ai player
		board[i][j] = ai;

		toggleCurrentPlayer();
	}

	// -------------------DRAW-------------------
	background(200);

	// draw grid
	push();
	strokeWeight(5);
	line(cellSize, gridOffset, cellSize, height - gridOffset);
	line(cellSize * 2, gridOffset, cellSize * 2, height - gridOffset);
	line(gridOffset, cellSize, width - gridOffset, cellSize);
	line(gridOffset, cellSize * 2, width - gridOffset, cellSize * 2);
	pop();

	// draw spots
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			// get board position
			let spot = board[i][j];

			if (spot != empty) {
				// spot coords
				const x = cellSize * j + cellSize / 2;
				const y = cellSize * i + cellSize / 2;

				// draw spot
				text(players[spot.toString()], x, y);
			}
		}
	}
}

function compare3(a, b, c, reject) {
	return a == b && b == c && a != reject;
}

function getWinner(board) {
	// horizontal
	for (let i = 0; i < 3; i++) {
		if (compare3(board[i][0], board[i][1], board[i][2], empty)) {
			return board[i][0];
		}
	}

	// vertical
	for (let j = 0; j < 3; j++) {
		if (compare3(board[0][j], board[1][j], board[2][j], empty)) {
			return board[0][j];
		}
	}

	// diagonal
	if (
		compare3(board[0][0], board[1][1], board[2][2], empty) ||
		compare3(board[0][2], board[1][1], board[2][0], empty)
	) {
		return board[1][1];
	}

	// draw
	let emptySpots = 9;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] != empty) {
				emptySpots--;
			}
		}
	}
	if (emptySpots == 0) {
		return 0;
	}

	// no winner
	return null;
}

function humanMove() {
	// get board position
	const i = Math.floor(mouseY / cellSize);
	const j = Math.floor(mouseX / cellSize);

	// check if target board spot is empty
	if (board[i][j] == empty && currentPlayer == human) {
		// update target board spot
		board[i][j] = human;

		toggleCurrentPlayer();
	}
}

function toggleCurrentPlayer() {
	currentPlayer = currentPlayer == ai ? human : ai;
}
