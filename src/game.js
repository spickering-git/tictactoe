function Game(username1, username2){
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
			board[i][j] = '*';
		}
	}
	
	this.board = board;
	
	return this;
}

module.exports.game = game;