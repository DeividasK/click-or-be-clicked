import firebase from 'firebase'
import store from '../store'

export function authenticateUser() {
  return store.dispatch((dispatch) => {
      dispatch({ type: 'AUTHENTICATE_USER_PENDING'});
      
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: 'AUTHENTICATE_USER_FULFILLED', payload: user });
        } else {
          dispatch({ type: 'AUTHENTICATE_USER_REJECTED' });
        }
      });
    })
  
}