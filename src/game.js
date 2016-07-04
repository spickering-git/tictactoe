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
	
	const boardSize = 3;
	var board = new Array(boardSize);
	for(var i = 0; i < boardSize; i++)
	{
		board[i] = new Array(boardSize);

		for(var j = 0; j < boardSize; j++)
		{
			board[i][j] = ' ';
		}
	}
	
	this.board = board;

	this.gameStatus = gameStatus.ACTIVE_GAME;

	return this;
}

/*
*the game status types
 */
const gameStatus = {
	ACTIVE_GAME: 1,
	PLAYER1_WINNER: 2,
	PLAYER2_WINNER: 3,
	TIE: 4
}

/*
this function will draw the board
it handles a flexible board size
 */
function drawCurrentBoard(currentGame){
	var boardDrawn;

	var board = currentGame;
	for(var i = 0; i < board.length; i++)
	{
		if(i>0)
		{
			boardDrawn += '\n'

			for(var j = 0; j < board[i].length; j++)
			{
				boardDrawn += '-';
			}
		}

		for(var j = 0; j < board[i].length; j++)
		{
			if(j>0)
			{
				boardDrawn += '|';
			}

			boardDrawn += board[i][j];
		}
	}

	return boardDrawn;
}

module.exports.game = game;
module.exports.gameStatus = gameStatus;
module.exports.drawCurrentBoard = drawCurrentBoard;