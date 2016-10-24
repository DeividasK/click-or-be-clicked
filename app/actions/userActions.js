import firebase from 'firebase'
import store from '../store'

export function authenticate() {
  return store.dispatch((dispatch) => {
    dispatch({ type: 'AUTHENTICATE_PENDING'});
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'AUTHENTICATE_FULFILLED', payload: user });
        firebase.database().ref('users-active/' + user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL
        });
      } else {
        dispatch({ type: 'AUTHENTICATE_REJECTED' });
      }
    });
  })
}

export function signIn() {
  return store.dispatch((dispatch) => {
    dispatch({ type: 'SIGN_IN_WITH_GOOGLE'});
    return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  });
}

export function signOut(userId) {
  return store.dispatch((dispatch) => {
    dispatch({ type: 'SIGN_OUT_PENDING'});
    console.log('User ID', userId);
    firebase.database().ref('users-active/' + userId).remove();
    
    return firebase.auth().signOut().then(function() {
      dispatch({ type: 'SIGN_OUT_FULFILLED'});
    }, function(error) {
      dispatch({ type: 'SIGN_OUT_REJECTED'});
    });
  });
}

export function getActiveUsers() {
  store.dispatch((dispatch) => {
    dispatch({ type: 'ACTIVE_USERS_LISTENING'});

    firebase.database().ref('users-active').on('value', (snapshot) => {
      dispatch({ type: 'ACTIVE_USERS_CHANGED', payload: snapshot.val() });
    });
  });
}

export function selectPlayer(uid) {
  store.dispatch({ type: 'PLAYER_SELECTED', payload: uid});
}

export function deselectPlayer() {
  store.dispatch({ type: 'PLAYER_DESELECTED' });
}