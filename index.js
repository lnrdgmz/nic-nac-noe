const TicTacToeBoard = function() {
  this.board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
};

TicTacToeBoard.prototype = {
  /**
  * Place takes a character and a board coordinate ([rowIdx, colIdx])
  * and adds the letter to the board
  */
  squareExists: function(square) {
    return rowIdx >= 0 && rowIdx < this.board.length && colIdx >= 0 && colIdx < this.board[rowIdx].length;
  },
  place: function(letter, square) {
    const rowIdx = square[0];
    const colIdx = square[1];
    if (!squareExists(square) || this.board[rowIdx][colIdx] !== ' ') {
      console.error('Invalid move')
    } else {
      this.board[rowIdx][colIdx] = letter;
    }
  },
  /**
  * isWinningMove returns true if the square on the board is part of a 3-long line
  */
  isWinningMove: function(square) {
    return isHorizontalLine(square) || isVerticalLine(square) || isDiagonalLine(square);
  },
  isHorizontalLine: function(square) {
    const letter = this.board[square[0]][square[1]];
    return this.board[square[0]].every(sq => sq === letter);
  },
  isVerticalLine: function(square) {
    const letter = this.board[square[0]][square[1]];
    return  this.board.reduce((acc, sq) => {
      return acc && sq === letter;
    }, true)
  },
  isDiagonalLine: function(square) {
    /**
     * Fill me out!
     */
  },
  boardToString: function() {
    const rowToString = (row) => {
      return row.join(' | ');
    }
    return this.board.map(rowToString).join('\n---------\n') + '\n';
  }
};

const board = new TicTacToeBoard();

console.log(board.boardToString())

// set current player to X

// while (true) {
//    print board on the screen
//    prompt 'Player [X|Y], choose your move'
//    if move is invalid, print error and resume from top of loop
//    else if the move is a winning move, end game
//    else toggle player
// }