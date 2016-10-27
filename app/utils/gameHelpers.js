function generateColor(i, j) {
  return ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) ? 'blue' : 'red';
}

function createEmptyBoard(boardSize) {
  let board = {};
  
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      let key = i * 6 + j + 1;
      let color = generateColor(i, j);

      board[key] = color;
    }
  }
  
  return board;
}

export function createNewBoard(board) {
  if (board === undefined) {
    return createEmptyBoard(6);
  }

  let boardSize = Math.sqrt(Object.keys(board).length);
  

  let gameBoard = {
    list: [],
    blue: 0,
    red: 0,
  };
  

  for (let i = 0; i < boardSize; i += 1) {
    let blocks = [];
    
    for (let j = 0; j < boardSize; j += 1) {
      let key = i * 6 + j + 1;
      let color;
      
      if (board[key] !== undefined) {
        color = board[key];
      } else {
        color = generateColor(i, j);
        board[key] = color;
      }
      
      gameBoard[color] += 1;

      blocks.push({ 'key': key, 'color': color });
    }
    
    gameBoard.list.push({ key: i, blocks: blocks });
  }
  
  return gameBoard;
}