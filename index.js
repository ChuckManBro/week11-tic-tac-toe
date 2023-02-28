'use strict';

/*

WEEK 11 CODING ASSIGNMENT

Using any of the tools you’ve worked with so far, create a game of Tic-Tac-Toe.
- Create a Tic-Tac-Toe game grid using your HTML element of choice.
- When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
- A heading should say whether it is X’s or O’s turn and change with each move made.
- A button should be available to clear the grid and restart the game.
- When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

*/

//NOTE - Two buttons for testing purposes only

function testButton1() {
	console.log('Test1 button was clicked.');
	// TEST FUNCTION BELOW THIS LINE
	endGame();
}

function testButton2() {
	console.log('Test2 button was clicked.');
	// TEST FUNCTION BELOW THIS LINE
	console.log(winningSubgame);
}

// Starter variables
const body = document.querySelector('#bkg-body-center');
let activePlayer;
let startingPlayer = 'X';
let gameFinished;
let subGames = [];
let winningSubgame = '';

// Start game
newGame();

function endGame() {
	// Remove 'onclick' attribute from all cells
	const activeContainer = document.querySelector('.active');
	const cells = activeContainer.querySelectorAll(`.cell`);
	for (const element of cells) {
		element.removeAttribute('onclick');
	}

	// Scribble over top of finished game
	const scribble = activeContainer.querySelector(`.scribble`);
	scribble.classList.remove('hidden');

	// Remove 'active' class from finished game
	activeContainer.classList.remove('active');

	// Start a new game
	newGame();
}

function newGame() {
	// Reset subGame scores
	subGames = [
		['row1', 0, 0, 0],
		['row2', 0, 0, 0],
		['row3', 0, 0, 0],
		['col1', 0, 0, 0],
		['col2', 0, 0, 0],
		['col3', 0, 0, 0],
		['diagonalLB', 0, 0, 0],
		['diagonalLT', 0, 0, 0],
	];

	winningSubgame = '';

	gameFinished = false;

	// Clone the blank default round-container and make it visible
	const blank = document.querySelector('.blank');
	const newBlank = blank.cloneNode(true);
	newBlank.classList.remove('blank');
	newBlank.classList.add('active');
	body.appendChild(newBlank);

	// Set the starting player
	activePlayer = startingPlayer;

	// Print starting player in message
	const activeContainer = document.querySelector(`.active`);
	activeContainer.querySelector(`.message`).textContent = `${startingPlayer} starts`;

	// Swap starting player for next game
	startingPlayer = startingPlayer === 'X' ? 'O' : 'X';
}

function cellClick(cell) {
	console.log(`${cell} clicked!`); //NOTE - Testing purposes only

	// Find current button
	const activeContainer = document.querySelector(`.active`);
	const currentButton = activeContainer.querySelector(`.cell-${cell}`);

	// Do only IF cell is blank
	if (currentButton.textContent === '' && !gameFinished) {
		// Insert active player's mark in the clicked cell
		currentButton.textContent = activePlayer;

		// Update subgame array
		const activePlayerNumber = activePlayer === 'X' ? 1 : 2;
		switch (cell) {
			case '1':
				subGames[0][activePlayerNumber]++;
				subGames[3][activePlayerNumber]++;
				subGames[7][activePlayerNumber]++;
				break;
			case '2':
				subGames[0][activePlayerNumber]++;
				subGames[4][activePlayerNumber]++;
				break;
			case '3':
				subGames[0][activePlayerNumber]++;
				subGames[5][activePlayerNumber]++;
				subGames[6][activePlayerNumber]++;
				break;
			case '4':
				subGames[1][activePlayerNumber]++;
				subGames[3][activePlayerNumber]++;
				break;
			case '5':
				subGames[1][activePlayerNumber]++;
				subGames[4][activePlayerNumber]++;
				subGames[6][activePlayerNumber]++;
				subGames[7][activePlayerNumber]++;
				break;
			case '6':
				subGames[1][activePlayerNumber]++;
				subGames[5][activePlayerNumber]++;
				break;
			case '7':
				subGames[2][activePlayerNumber]++;
				subGames[3][activePlayerNumber]++;
				subGames[6][activePlayerNumber]++;
				break;
			case '8':
				subGames[2][activePlayerNumber]++;
				subGames[4][activePlayerNumber]++;
				break;
			case '9':
				subGames[2][activePlayerNumber]++;
				subGames[5][activePlayerNumber]++;
				subGames[7][activePlayerNumber]++;
		}

		// Update cat's status for each subGame
		for (const element of subGames) {
			if (element[1] > 0 && element[2] > 0) {
				element[3] = 1;
			}
		}

		// Check for win
		for (const element of subGames) {
			if (element[activePlayerNumber] === 3) {
				// Set game finished
				gameFinished = true;

				// Draw the winning subgame circle
				winningSubgame = element[0];
				const winCircle = activeContainer.querySelector('.win-circle');
				winCircle.firstElementChild.setAttribute(`src`, `./images/circle-${winningSubgame}.png`);
				winCircle.classList.remove(`hidden`);

				// Print winner in message
				activeContainer.querySelector('.message').textContent = `${activePlayer} wins !!`;
			}
		}

		if (gameFinished) return;

		// Check for overaall cat's game
		let catsTally = 0;
		for (const element of subGames) {
			catsTally += element[3];
		}
		if (catsTally === 8) {
			gameFinished = true;

			// Print "cat's game" in message
			activeContainer.querySelector('.message').textContent = `cat's game`;
		}

		if (gameFinished) return;

		// Swap active player
		activePlayer = activePlayer === 'X' ? 'O' : 'X';
		activeContainer.querySelector('.message').textContent = `it's ${activePlayer}'s turn`;
	}
}
