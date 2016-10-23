export default function reducer(state = {
    data: {
      id: null,
      name: null,
      email: null,
      image: null
    },
    auth: false,
    authPending: false
  }, action) {
  
  switch(action.type) {
    case "AUTHENTICATE_PENDING": {
      state = { ...state, authPending: true };
      break;
    }
    
    case "AUTHENTICATE_FULFILLED": {
      console.log(action.payload);
      state = {
        ...state,
        authPending: false,
        auth: true,
        data: {
          id: action.payload.uid,
          name: action.payload.displayName,
          email: action.payload.email,
          image: action.payload.photoURL
        }
      };
      break;
    }
    
    case "AUTHENTICATE_REJECTED": {
      state = { ...state, authPending: false, auth: false };
      break;
    }
  }
  
  return state;
}