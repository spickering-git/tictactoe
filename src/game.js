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
			return 'Row and column must be within the board size';
		}
		else if (currentGame.board[row][col] != gameCellFillTypes.EMPTY) {
			return 'Board space must be empty';
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

				return getCurrentStatus(currentGame);
			}
			else {
				if(currentGame.username1 == payload.user_name ||
					currentGame.username2 == payload.user_name){
					if(currentGame.username1 == payload.user_name){
						return 'Hey! wait your turn, it\'s time for ' + currentGame.username1 +
								' to make a mark';
					}
					else {
						return 'Hey! wait your turn, it\'s time for ' + currentGame.username2 +
							' to make a mark';
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

function getCurrentStatus(currentGame){
	return 'It is ' + currentGame.currentUser + '\'s turn in the game ' +
		'between ' + currentGame.username1 + ' (X) and ' + currentGame.username2 + ' (O) ' +
		drawCurrentBoard(currentGame);
}



module.exports.game = game;
module.exports.gameStatusTypes = gameStatusTypes;
module.exports.gameCellFillTypes = gameCellFillTypes;
module.exports.drawCurrentBoard = drawCurrentBoard;
module.exports.getCurrentStatus = getCurrentStatus;