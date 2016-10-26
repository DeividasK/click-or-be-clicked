import store from '../store'
import firebase from 'firebase'

export function sendGameRequest(playerOneUid, playerTwoUid, playerTwoName) {

  let gameKey = firebase.database().ref('games').push().key;
  
  firebase.database().ref('games/' + gameKey).set({
    players: { blue: playerOneUid, red: playerTwoUid }
  });
  
  store.dispatch({ type: 'GAME_REQUEST_SENT', payload: {
    gameKey: gameKey,
    playerOne: playerOneUid,
    playerTwo: playerTwoUid,
    content: {
      header: "Game request sent",
      body: "Waiting for a response from " + playerTwoName + ".",
      danger: "Cancel"
    }
  }});
}

export function cancelGameRequest(gameKey) {
  firebase.database().ref('games/' + gameKey).remove();
  
  store.dispatch({ type: 'GAME_REQUEST_CANCELED', payload: {
    'gameKey': gameKey
  }});
}

export function acceptGame() {
  store.dispatch({ type: 'GAME_REQUEST_ACCEPTED' }); 
}

export function rejectGame(gameKey) {
  firebase.database().ref('games/' + gameKey).remove();
  
  store.dispatch({ type: 'GAME_REQUEST_REJECTED', payload: {
    'gameKey': gameKey
  }});  
}

export function endGame() {
  
}

export function startGame() {
  
}

export function getGames(modalCallback, modalAcceptCallback) {
  store.dispatch((dispatch) => {
    dispatch({ type: 'GAMES_LISTENING'});

    firebase.database().ref('games').on('child_added', (data) => {
      if (store.getState().user.data.id !== data.val().players.red) { return; }
      
      dispatch({ type: 'GAME_ADDED', payload: {
        gameKey: data.key,
        opponent: data.val().players.blue,
        rejectGame: modalCallback,
        successHandler: modalAcceptCallback,
        content: {
          header: "New game request",
          body: store.getState().players.object[data.val().players.blue].name + " wants to play with you.",
          danger: "Decline",
          success: "Accept"
        }
      } });
    });
    
    firebase.database().ref('games').on('child_removed', (data) => {
      if (store.getState().game.id !== data.key) { return; }
      
      dispatch({ type: 'GAME_REMOVED', payload: {
        gameKey: data.key,
        opponent: data.val().players.blue
      } });
    });
  });
}