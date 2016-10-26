import firebase from 'firebase'
import store from '../store'

export default function reducer(state = {
    list: [],
    object: {},
    selected: false,
    selectedPlayer: null
  }, action) {
  
  switch(action.type) {
    case 'ACTIVE_USERS_CHANGED': {
      let newPlayersList = [];
      
      if (Object.keys(action.payload).length === 0) {
        return { ...state, list: newPlayersList, object: {} };
      } 
      
      Object.keys(action.payload).forEach((key) => { newPlayersList.push(action.payload[key]); })
      
      return { ...state, list: newPlayersList, object: action.payload };
    }
    
    case 'SIGN_OUT_FULFILLED': {
      return { ...state, list: [], selected: false, selectedPlayer: null };
    }
    
    case 'PLAYER_SELECTED': {
      return { ...state, selected: action.payload, selectedPlayer: state.object[action.payload] };
    }
    
    case 'PLAYER_DESELECTED': {
      return { ...state, selected: false, selectedPlayer: null };
    }
  }
  
  return state;
}