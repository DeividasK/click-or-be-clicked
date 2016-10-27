export default function reducer(state = {
    id: null,
    opponentId: null,
    gameRequestSent: false,
    gameRequestReceived: false,
    gameInProgress: false,
    boardSize: 6,
    list: [],
    board: {},
    red: 18,
    blue: 18,
  }, action) {
    
  var newState = Object.assign({}, state);
  
  switch(action.type) {
    case 'GAME_REQUEST_SENT':
      return { ...state, gameRequestSent: true, id: action.payload.gameKey };
      
    case 'GAME_ADDED':
      return { ...state, gameRequestReceived: true, id: action.payload.gameKey, opponentId: action.payload.opponent };
    
    case 'GAME_REMOVED':
      return { ...state, gameRequestReceived: false, id: action.payload.gameKey };
      
    case 'GAME_REQUEST_ACCEPTED':
      return {
        ...state,
        gameRequestReceived: false,
        gameInProgress: true,
        board: action.payload
      };
      
    case 'GAME_STARTED':
      return {
        ...state,
        gameRequestSent: false,
        gameInProgress: true,
        board: action.payload.board,
        list: action.payload.list
      };
      
    case 'GAME_BOARD_CHANGED':
      newState.board[action.payload.key] = action.payload.value;
      return newState;

    default:
      return newState;
  }
}