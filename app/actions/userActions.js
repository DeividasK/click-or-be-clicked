import firebase from 'firebase'
import store from '../store'

export function authenticate() {
  return store.dispatch((dispatch) => {
    dispatch({ type: 'AUTHENTICATE_PENDING'});
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'AUTHENTICATE_FULFILLED', payload: user });
        firebase.database().ref('users-active/' + user.uid).set({
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