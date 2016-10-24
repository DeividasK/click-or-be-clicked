import firebase from 'firebase'
import store from '../store'

export default function reducer(state = {
    list: [],
    selected: false
  }, action) {
  
  switch(action.type) {
    case 'ACTIVE_USERS_CHANGED': {
      let newPlayersList = [];
      
      if (Object.keys(action.payload).length === 0) {
        return { ...state, list: newPlayersList };
      } 
      
      Object.keys(action.payload).forEach((key) => { newPlayersList.push(action.payload[key]); })
      return { ...state, list: newPlayersList };
    }
    
    case 'SIGN_OUT_FULFILLED': {
      return { ...state, list: [], selected: false };
    }
    
    case 'PLAYER_SELECTED': {
      return { ...state, selected: action.payload };
    }
    
    case 'PLAYER_DESELECTED': {
      return { ...state, selected: false };
    }
  }
  
  return state;
}