export default function reducer(state = {
    id: null,
    auth: false,
    authPending: false
  }, action) {
  
  switch(action.type) {
    case "AUTHENTICATE_USER_PENDING": {
      state = { ...state, authPending: true };
      break;
    }
    
    case "AUTHENTICATE_USER_FULFILLED": {
      state = { ...state, authPending: false, auth: true };
      break;
    }
    
    case "AUTHENTICATE_USER_REJECTED": {
      state = { ...state, authPending: false, auth: false };
      break;
    }
  }
  
  return state;
}