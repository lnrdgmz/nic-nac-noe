const readline = require('readline');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

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
    const rowIdx = square[0];
    const colIdx = square[1];
    return rowIdx >= 0 && rowIdx < this.board.length && colIdx >= 0 && colIdx < this.board[rowIdx].length;
  },
  place: function(letter, square) {
    const rowIdx = square[0];
    const colIdx = square[1];
    if (!this.squareExists(square) || this.board[rowIdx][colIdx] !== ' ') {
      console.error('Invalid move');
      return false
    } else {
      this.board[rowIdx][colIdx] = letter;
      return true;
    }
  },
  /**
  * isWinningMove returns true if the square on the board is part of a 3-long line
  */
  isWinningMove: function(square) {
    return this.isHorizontalLine(square) || this.isVerticalLine(square) || this.isDiagonalLine(square);
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
    const x = square[0];
    const y = square[1];
    // check if square is one of the 5 spaces which can make up a diagonal
    if (
      (x === 0 && y === this.board.length - 1) ||
      (x === y) ||
      (x === this.board.length - 1 && y === 0)) {
        return this.backslashLine() || this.slashLine();
      }
  },
  backslashLine: function() {
    const letter = this.board[0][0];
    for (let i = 1; i < this.board.length; i++) {
      if (this.board[i][i] !== letter) return false;
    }
    return true;
  },
  slashLine: function() {
    const letter = this.board[0][this.board.length - 1];
    for (let i = 1; i < this.board.length; i++) {
      if (this.board[i][this.board.length - i - 1]) return false;
    }
    return true;
  },
  boardToString: function() {
    const rowToString = (row) => {
      return row.join(' | ');
    }
    return this.board.map(rowToString).join('\n---------\n') + '\n';
  }
};

const board = new TicTacToeBoard();

const handleMove = (player, x, y, board) => {
  move = board.place(player, [x, y]);
  if (move) {
    const nextPlayer = player === 'X' ? 'O' : 'X';
    promptForMove(nextPlayer, board)
  } else {
    promptForMove(player, board);
  }
};

const promptForMove = (player, board) => {
  console.log(board.boardToString());

  rl.question(`${player}, make your move (row,col):\n`, (str) => {
    console.log('\n\n\n');
    const arr = str.split(',')
    handleMove(player, parseInt(arr[0], 10), parseInt(arr[1], 10), board);
  })
};

promptForMove('X', board);