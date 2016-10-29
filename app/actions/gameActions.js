import store from '../store';
import firebase from 'firebase';
import { hashHistory } from 'react-router';
import { createNewBoard } from '../utils/gameHelpers';

export function sendGameRequest(playerOneUid, playerTwoUid, playerTwoName) {

  let gameKey = firebase.database().ref('games').push().key;
  let players = { blue: playerOneUid, red: playerTwoUid };
  let actions = { blue: 30, red: 30 };

  firebase.database().ref('games/' + gameKey).set({
    players: players,
    actions: actions,
  });

  store.dispatch({ type: 'GAME_REQUEST_SENT', payload: {
    gameKey: gameKey,
    players: players,
    actions: actions,
    content: {
      header: "Game request sent",
      body: "Waiting for a response from " + playerTwoName + ".",
      danger: "Cancel"
    }
  }});

  firebase.database().ref('games/' + gameKey).on('child_added', (data) => {
    if (data.key !== 'board') { return; }
    store.dispatch({ type: 'GAME_STARTED', payload: data.val() });
    hashHistory.push('/battle/' + gameKey);
  });
}

export function cancelGameRequest(gameKey) {
  firebase.database().ref('games/' + gameKey).remove();

  store.dispatch({ type: 'GAME_REQUEST_CANCELED', payload: {
    'gameKey': gameKey
  }});
}
export function acceptGame() {
  let payload = createNewBoard();
  store.dispatch({ type: 'GAME_REQUEST_ACCEPTED', payload: payload });

  firebase.database().ref('games/' + this.props.gameKey).update({
    board: payload
  });
  hashHistory.push('/battle/' + this.props.gameKey);
}

export function rejectGame(gameKey) {
  firebase.database().ref('games/' + gameKey).remove();

  store.dispatch({ type: 'GAME_REQUEST_REJECTED', payload: {
    'gameKey': gameKey
  }});
}

export function updateBoard(gameKey) {
  firebase.database().ref('games/' + gameKey + '/board').on('child_changed', function(data){
    store.dispatch({ type: 'GAME_BOARD_CHANGED', payload: {
      key: data.key,
      value: data.val()
    }});

  }.bind(this));
}

export function exitGame(gameKey) {
  firebase.database().ref('games/' + gameKey).update({
    ended: true
  });
  hashHistory.push('/');
}

export function stopGames() {
  store.dispatch({ type: 'GAMES_LISTENING'});
  firebase.database().ref('games').off();
}

export function getGames(modalDangerCallback, modalSuccessCallback) {
  store.dispatch((dispatch) => {
    dispatch({ type: 'GAMES_LISTENING'});

    firebase.database().ref('games').on('child_added', (data) => {
      if (store.getState().user.data.id !== data.val().players.red || data.val().ended === true) { return; }

      dispatch({ type: 'GAME_ADDED', payload: {
        gameKey: data.key,
        players: data.val().players,
        actions: data.val().actions,
        rejectGame: modalDangerCallback,
        successHandler: modalSuccessCallback,
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

export function updateGame(gameKey, blocks, playerColor, actionsLeft) {
  let actions = {};
  actions[playerColor] = actionsLeft;

  store.dispatch({ type: 'BLOCK_CLICK', payload: {
    board: blocks,
    actions: actions
  }});

  firebase.database().ref(`games/${gameKey}/board`).update(blocks);
  firebase.database().ref(`games/${gameKey}/actions`).update(actions);
}

export function resumeGame(gameKey) {
  firebase.database().ref('games/' + gameKey).once('value', (data) => {
    let color = (store.getState().user.data.id === data.val().players.red) ? 'red' : 'blue';

    store.dispatch({ type: 'GAME_RESUMED', payload: {
      gameKey: gameKey,
      players: data.val().players,
      actions: data.val().actions,
      board: data.val().board,
      color: color,
    }});
  });
}