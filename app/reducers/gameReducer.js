export default function reducer(state = {
    id: null,
    opponentId: null,
    gameRequestSent: false,
    gameRequestReceived: false,
    gameInProgress: false,
    boardSize: 6,
    board: {},
  }, action) {
    
  var newState = Object.assign({}, state);
  
  switch(action.type) {
    case 'GAME_REQUEST_SENT':
      newState.gameRequestSent = true;
      newState.id = action.payload.gameKey;
      newState.players = action.payload.players;
      return newState;
      
    case 'GAME_ADDED':
      newState.gameRequestReceived = true;
      newState.id = action.payload.gameKey;
      newState.players = action.payload.players;
      return newState;
    
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
        board: action.payload,
      };
      
    case 'GAME_BOARD_CHANGED':
      newState.board[action.payload.key] = action.payload.value;
      return newState;

    default:
      return newState;
  }
}