function bestMove() {
	let bestScore = -Infinity;
	let move = Object();

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == empty) {
				// move ai plyaer
				board[i][j] = ai;

				// get minimax score of move
				const score = minimax(board, false);

				// reset board
				board[i][j] = empty;

				// maximise score
				if (score > bestScore) {
					bestScore = score;
					move = { i, j };
				}
			}
		}
	}

	return move;
}

function minimax(board, isMaximising) {
	// check for end board state
	const winner = getWinner(board);
	if (winner != null) {
		return winner;
	}

	if (isMaximising) {
		// ai (maximise)
		let bestScore = -Infinity;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == empty) {
					// move ai plyaer
					board[i][j] = ai;

					// get minimax score of move
					const score = minimax(board, false);
					bestScore = max(bestScore, score);

					// reset board
					board[i][j] = empty;

					// alpha-beta pruning
					if (bestScore == ai) {
						return ai;
					}
				}
			}
		}

		return bestScore;
	} else {
		// human (minimise)
		let bestScore = +Infinity;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == empty) {
					// move human plyaer
					board[i][j] = human;

					// get minimax score of move
					const score = minimax(board, true);
					bestScore = min(bestScore, score);

					// reset board
					board[i][j] = empty;

					// alpha-beta pruning
					if (bestScore == human) {
						return bestScore;
					}
				}
			}
		}

		return bestScore;
	}
}
