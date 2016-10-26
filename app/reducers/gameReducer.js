export default function reducer(state = {
    id: null,
    opponentId: null,
    gameRequestSent: false,
    gameRequestReceived: false,
    gameInProgress: false
  }, action) {
  
  switch(action.type) {
    case 'GAME_REQUEST_SENT':
      return { ...state, gameRequestSent: true, id: action.payload.gameKey };
      
    case 'GAME_ADDED':
      return { ...state, gameRequestReceived: true, id: action.payload.gameKey, opponentId: action.payload.opponent };
    
    case 'GAME_REMOVED':
      return { ...state, gameRequestReceived: false, id: action.payload.gameKey };

    default:
      return state;
  }
}