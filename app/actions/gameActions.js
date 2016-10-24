import store from '../store'

export function sendGameRequest(playerOneUid, playerTwoUid) {
  store.dispatch({ type: 'GAME_REQUEST_SENT' });
}

export function cancelGameRequest() {
  
}

export function acceptGame() {
  
}

export function rejectGame() {
  
}

export function endGame() {
  
}

export function startGame() {
  
}