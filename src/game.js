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
	X: 1,
	O: -1,
	EMPTY: 0
};

const gameCellFillSymbols = {
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

	this.cellFilledCount = 0;

	this.totalCellsCount = this.boardSize * this.boardSize;

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

			switch(board[i][j])
			{
				case gameCellFillTypes.EMPTY:
					boardDrawn += gameCellFillSymbols.EMPTY;
					break;
				case gameCellFillTypes.X:
					boardDrawn += gameCellFillSymbols.X;
					break;
				case gameCellFillTypes.O:
					boardDrawn += gameCellFillSymbols.O;
					break;
			}
			//boardDrawn += board[i][j];
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

		if(row < 0 || row >= currentGame.boardSize
			|| col < 0 || col >= currentGame.boardSize)
		{
			return 'Row and column must be within the board size' + drawCurrentBoard(currentGame);
		}
		else if (currentGame.board[row][col] != gameCellFillTypes.EMPTY) {
			return 'Board space must be empty' + drawCurrentBoard(currentGame);
		}
		else {
			if(currentGame.currentUser == payload.user_name){

				this.cellFilledCount++;


				if(currentGame.currentUser == currentGame.username1){
					currentGame.board[row][col] = gameCellFillTypes.X;

					currentGame.currentUser = currentGame.username2;
				}
				else {
					currentGame.board[row][col] = gameCellFillTypes.O;

					currentGame.currentUser = currentGame.username1;
				}

				return checkForWinnerOrTie(currentGame);
				
				

			}
			else {
				if(currentGame.username1 == payload.user_name ||
					currentGame.username2 == payload.user_name){

						return 'Hey! wait your turn, it\'s time for ' + currentGame.currentUser +
							' to make a take a turn.' +
							drawCurrentBoard(currentGame);

				}
				else {
					return 'Sorry, you will need to wait for the current game to finish in this channel or try another channel.';
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
		diagonalWinner(currentGame);
	}

	if(currentGame.gameStatusTypes == gameStatusTypes.ACTIVE_GAME){
		checkForTie(currentGame);
	}
	
	return returnTextForGameWinOrTieStatus(currentGame);
}

function returnTextForGameWinOrTieStatus(currentGame){
	//var gameStatusText = '';
	
	var statusString = '';
	switch(currentGame.gameStatusTypes){
		case gameStatusTypes.PLAYER1_WINNER:
			currentGame.finished = true;
			statusString = '\nThis game has been won by ' + currentGame.username1;
			break;
		case gameStatusTypes.PLAYER2_WINNER:
			currentGame.finished = true;
			statusString =  '\nThis game has been won by ' + currentGame.username2;
			break;
		case gameStatusTypes.TIE:
			currentGame.finished = true;
			statusString =  '\nThis game is tied';
			break;
		case gameStatusTypes.ACTIVE_GAME:
		default:
			break;
	}

	if(currentGame.finished){
		return drawCurrentBoard(currentGame) + statusString;
	}
	else {
		return getCurrentStatus(currentGame);
	}

}



/*
checks current board for a tie
 */
function checkForTie(currentGame){

	console.log('currentGame.totalCellsCount ' + currentGame.totalCellsCount + ' currentGame.cellFilledCount ' + currentGame.cellFilledCount);

	if(currentGame.totalCellsCount == currentGame.cellFilledCount){
		currentGame.gameStatusTypes = gameStatusTypes.TIE;
	}
	
}

function rowWinner(currentGame){

	var board = currentGame.board;

	var rowCnt = 0;

	while(rowCnt < currentGame.boardSize)
	{
		var colCnt = 0;

		var rowTotal = 0;

		rowTotal = board[rowCnt].reduce(
			function(total, num){return total + num},0
		);

		if(rowTotal == currentGame.boardSize){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
			break;
		}
		else if(rowTotal == -currentGame.boardSize){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
			break;
		}

		rowCnt++;
	}
}

function columnWinner(currentGame){

	var board = currentGame.board;

	var sumColArray = board[0];
	
	for(var rowCnt = 1; rowCnt < currentGame.boardSize; rowCnt++){
		sumColArray = board[rowCnt].map(function(cellVal, idx){
			return cellVal + sumColArray[idx];
		});
	}
	
	var colCnt = 0;

	while(colCnt < currentGame.boardSize)
	{
		if(sumColArray[colCnt] == currentGame.boardSize){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
			break;
		}
		else if(sumColArray[colCnt] == -currentGame.boardSize){
			currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
			break;
		}

		colCnt++;
	}
}

function diagonalWinner(currentGame){

	var board = currentGame.board;

	var daigonalCnt = 0;
	var upDiagRow = currentGame.boardSize - 1;
	var upDiagCol = 0;

	var diagTotal = 0;
	var upDiagTotal = 0;

	while(daigonalCnt < currentGame.boardSize)
	{
		diagTotal += board[daigonalCnt][daigonalCnt];

		upDiagTotal += board[upDiagRow][upDiagCol];

		daigonalCnt++;

		upDiagRow--;

		upDiagCol++;
	}

	if(diagTotal == currentGame.boardSize || upDiagTotal == currentGame.boardSize){
		currentGame.gameStatusTypes = gameStatusTypes.PLAYER1_WINNER;
	}
	else if(diagTotal == -currentGame.boardSize || upDiagCol == -currentGame.boardSize){
		currentGame.gameStatusTypes = gameStatusTypes.PLAYER2_WINNER;
	}
}

module.exports.game = game;
module.exports.gameStatusTypes = gameStatusTypes;
module.exports.gameCellFillTypes = gameCellFillTypes;
module.exports.drawCurrentBoard = drawCurrentBoard;
module.exports.mark = mark;
module.exports.getCurrentStatus = getCurrentStatus;
module.exports.checkForWinnerOrTie = checkForWinnerOrTie;