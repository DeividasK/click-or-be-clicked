export default function reducer(state = {
    id: null,
    gameRequestSent: false,
    gameRequestReceived: false,
    gameInProgress: false,
    board: {},
    players: { blue: '', red: '' },
    actions: { blue: 30, red: 30 },
    my: {
      color: '',
      shapes: ['.'],
    },
  }, action) {

  var newState = Object.assign({}, state);

  switch(action.type) {
    case 'GAME_REQUEST_SENT':
      newState.gameRequestSent = true;
      newState.id = action.payload.gameKey;
      newState.players = action.payload.players;
      newState.actions = action.payload.actions;
      newState.my.color = 'blue';
      newState.my.shapes = ['.'];
      return newState;

    case 'GAME_ADDED':
      newState.gameRequestReceived = true;
      newState.id = action.payload.gameKey;
      newState.players = action.payload.players;
      newState.actions = action.payload.actions;
      newState.my.color = 'red';
      newState.my.shapes = ['.'];
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

    case 'GAME_RESUMED':
      newState.id = action.payload.gameKey;
      newState.board = action.payload.board;
      newState.players = action.payload.players;
      newState.actions = action.payload.actions;
      newState.my.color = action.payload.color;
      newState.gameInProgress = true;
      return newState;

    case 'BLOCK_CLICK':
      newState.board = Object.assign(newState.board, action.payload.board);
      newState.actions = Object.assign(newState.actions, action.payload.actions);
      return newState;

    case 'NEW_SHAPE':
      newState.my.shapes.shift();
      newState.my.shapes.push(action.payload);
      return newState;

    default:
      return newState;
  }
}