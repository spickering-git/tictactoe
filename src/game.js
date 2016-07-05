/*
 *the game status types
 */
const gameStatusTypes = {
	ACTIVE_GAME: 1,
	PLAYER1_WINNER: 2,
	PLAYER2_WINNER: 3,
	TIE: 4
};

const gameCellFillTypes = {
	X: 'X',
	O: 'O',
	EMPTY: '--'
};



/*
* This function returns a new game object
* params:
* username1: the first players username (the player that initiates the game)
* username2: the second players username
* possible future version with flexible board size
* */
function game(username1, username2){
	this.username1 = username1;
	this.username2 = username2;
	this.currentUser = username1;

	//var boardSizeTemp = 3;

	this.boardSize = 3;

	var board = new Array(this.boardSize);
	for(var i = 0; i < this.boardSize; i++)
	{
		board[i] = new Array(this.boardSize);

		for(var j = 0; j < this.boardSize; j++)
		{
			board[i][j] = gameCellFillTypes.EMPTY;
		}
	}
	
	this.board = board;

	this.gameStatusTypes = gameStatusTypes.ACTIVE_GAME;

	this.finished = false;
	
	return this;
}

/*
this function will draw the board
it handles a flexible board size
 */
function drawCurrentBoard(currentGame){
	var boardDrawn = '';

	var board = currentGame.board;

	//boardDrawn += '*';
	for(var i = 0; i < board.length; i++)
	{
		boardDrawn += '\n'

		for(var j = 0; j < board[i].length; j++)
		{
			if(j>0)
			{
				boardDrawn += '|';
			}

			boardDrawn += board[i][j];
		}
		
	}
	
	//boardDrawn += '*';
	
	return boardDrawn;
}

/*
 this function will draw the board
 it handles a flexible board size
 */
function mark(payload, currentGame, rowIn, columnIn){

	var row = rowIn - 1;
	var col = columnIn - 1;

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME) {

		if(row < 0 && row >= currentGame.boardSize
			&& col < 0 && col >= currentGame.boardSize)
		{
			return 'Row and column must be within the board size' + drawCurrentBoard(currentGame);
		}
		else if (currentGame.board[row][col] != gameCellFillTypes.EMPTY) {
			return 'Board space must be empty' + drawCurrentBoard(currentGame);
		}
		else {
			if(currentGame.currentUser == payload.user_name){
				if(currentGame.currentUser == currentGame.username1){
					currentGame.board[row][col] = gameCellFillTypes.X;

					currentGame.currentUser = currentGame.username2;
				}
				else {
					currentGame.board[row][col] = gameCellFillTypes.O;

					currentGame.currentUser = currentGame.username1;
				}

				if(currentGame.finished){
					return drawCurrentBoard(currentGame) + checkForWinnerOrTie(currentGame);
				}
				else {
					return getCurrentStatus(currentGame);
				}

			}
			else {
				if(currentGame.username1 == payload.user_name ||
					currentGame.username2 == payload.user_name){
					if(currentGame.username1 == payload.user_name){
						return 'Hey! wait your turn, it\'s time for ' + currentGame.username1 +
							' to make a mark' +
							drawCurrentBoard(currentGame);
					}
					else {
						return 'Hey! wait your turn, it\'s time for ' + currentGame.username2 +
							' to make a mark' +
							drawCurrentBoard(currentGame);
					}
				}
				else {
					return 'Sorry, you will need to wait for the current game to finish in this channel or try another channel';
				}
			}
		}
	}
	else {
		return 'There is not an active game in this channel. You should start one.';
	}
}

/*
returns the current status of the game and draws the board
 */
function getCurrentStatus(currentGame){
	return 'It is ' + currentGame.currentUser + '\'s turn in the game ' +
		'between ' + currentGame.username1 + ' (X) and ' + currentGame.username2 + ' (O) ' +
		drawCurrentBoard(currentGame);
}

/*
checks for the winner by row, column, diagonal and checks for a tie
 */
function checkForWinnerOrTie(currentGame){

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME) {
		rowWinner(currentGame);
	}

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME) {
		columnWinner(currentGame);
	}

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME) {
		diagonalDownWinner(currentGame);
	}

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME) {
		diagonalUpWinner(currentGame);
	}

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME){
		checkForTie(currentGame);
	}
	
	return returnTextForGameWinOrTieStatus(currentGame);
}

function returnTextForGameWinOrTieStatus(currentGame){
	var gameStatusText = '';

	switch(currentGame.gameStatusTypes){
		case gameStatusTypes.PLAYER1_WINNER:
			currentGame.finished = true;
			return '\nThis game has been won by ' + currentGame.username1;
		case gameStatusTypes.PLAYER2_WINNER:
			currentGame.finished = true;
			return '\nThis game has been won by ' + currentGame.username2;
		case gameStatusTypes.TIE:
			currentGame.finished = true;
			return '\nThis game is tied';
		case gameStatusTypes.ACTIVE_GAME:
			return '';
		default:
			return '';
	}

}

/*
checks current board for a tie
 */
function checkForTie(currentGame){

	var board = currentGame.board;

	var foundEmpty = false;

	var rowCnt = 0;

	while(rowCnt < currentGame.boardSize)
	{
		var colCnt = 0;

		while(colCnt < currentGame.boardSize)
		{
			if(board[rowCnt][colCnt] == gameCellFillTypes.EMPTY){
				foundEmpty = true;
				break;
			}

			colCnt++;
		}

		if(foundEmpty)
		{
			break;
		}

		rowCnt++;
	}

	if(rowCnt == currentGame.boardSize && colCnt == currentGame.boardSize){
		currentGame.gameStatusTypes = gameStatusTypes.TIE;
	}

}

function rowWinner(currentGame){

	var board = currentGame.board;

	var rowCnt = 0;

	while(rowCnt < currentGame.boardSize)
	{
		var firstCell = board[rowCnt][0];

		var colCnt = 1;

		while(colCnt < currentGame.boardSize)
		{
			if(firstCell != board[rowCnt][colCnt]){
				break;
			}

			colCnt++;
		}

		if(colCnt == currentGame.boardSize){
			if(firstCell == gameCellFillTypes.X){
				currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
			}
			else if(firstCell == gameCellFillTypes.O){
				currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
			}

			break;
		}

		rowCnt++;
	}
}

function columnWinner(currentGame){

	var board = currentGame.board;

	var colCnt = 0;

	while(colCnt < currentGame.boardSize)
	{
		var firstCell = board[0][colCnt];

		var rowCnt = 1;

		while(rowCnt < currentGame.boardSize)
		{
			if(firstCell != board[rowCnt][colCnt]){
				break;
			}

			rowCnt++;
		}

		if(rowCnt == currentGame.boardSize){
			if(firstCell == gameCellFillTypes.X){
				currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
			}
			else if(firstCell == gameCellFillTypes.O){
				currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
			}

			break;
		}

		colCnt++;

	}
}

function diagonalDownWinner(currentGame){

	var board = currentGame.board;

	var firstCell = board[0][0];

	var daigonalCnt = 1;

	while(daigonalCnt < currentGame.boardSize)
	{
		if(firstCell != board[daigonalCnt][daigonalCnt]){
			break;
		}

		daigonalCnt++;
	}

	if(daigonalCnt == currentGame.boardSize){
		if(firstCell == gameCellFillTypes.X){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
		}
		else if(firstCell == gameCellFillTypes.O){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
		}
	}
}

function diagonalUpWinner(currentGame){

	var board = currentGame.board;

	var firstCell = board[currentGame.boardSize-1][0];

	var rowCnt = currentGame.boardSize-2;
	var columnCnt = 1;

	while(columnCnt < currentGame.boardSize)
	{
		if(firstCell != board[rowCnt][columnCnt]){
			break;
		}

		rowCnt--;
		columnCnt++;
	}

	if(columnCnt == currentGame.boardSize){
		if(firstCell == gameCellFillTypes.X){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
		}
		else if(firstCell == gameCellFillTypes.O){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
		}
	}
}

module.exports.game = game;
module.exports.gameStatusTypes = gameStatusTypes;
module.exports.gameCellFillTypes = gameCellFillTypes;
module.exports.drawCurrentBoard = drawCurrentBoard;
module.exports.mark = mark;
module.exports.getCurrentStatus = getCurrentStatus;
module.exports.checkForWinnerOrTie = checkForWinnerOrTie;