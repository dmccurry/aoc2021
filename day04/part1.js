const fs = require('fs');

const addCall = (board, number) => {
  for (let i=0; i<board.length; i++) {
    for (let j=0; j<board[i].length; j++) {
      if (board[i][j] === number) {
        board[i][j] = 'x';
      }
    }
  }
}

const printWinner = (board, callnum) => {
  let sum = 0;
  for (let i=0; i<board.length; i++) {
    for (let j=0; j<board[i].length; j++) {
      if (board[i][j] != 'x') sum += parseInt(board[i][j]);
    }
  }
  console.log(sum * callnum);
}

const isWinner = (board) => {
  for (let i=0; i<board.length; i++) {
    let isWinner = true;

    for (let j=0; j <board[i].length; j++) {
      if (board[i][j] != 'x') isWinner = false;
    }

    if (isWinner) return true;
  }

  let row = board[0];
  let isWinner = true;
  for (let i=0; i<row.length; i++) {
    for (let j=0; j<board.length; j++) {
      if (board[j][i] != 'x') isWinner = false;
    }

    if (isWinner) return true;
  }

  return false;
}


fs.readFile('./input', 'utf-8', (err, data) => {
  let input = data.split('\n\n');
  let calls = input.shift();
  
  let boards = [];

  for (let i=0; i<input.length; i++) {
    boards[i] = input[i].split('\n');
  }
  for (let i=0; i<boards.length; i++) {
    for (let j=0; j<boards[i].length; j++) {
      boards[i][j] = boards[i][j].split(/\s/g).filter(v => v != '');
    }
  }
  calls = calls.split(',');

  for (let i=0; i<calls.length; i++) {
    for (let j=0; j<boards.length; j++) {
      addCall(boards[j], calls[i]);
      if (isWinner(boards[j])) {
        printWinner(boards[j], calls[i]);
        return;
      }
    }
  }
  
});