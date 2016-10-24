export default function reducer(state = {
    id: null,
    gameRequestSent: false,
    gameRequestReceived: false,
    gameInProgress: false
  }, action) {
  
  switch(action.type) {
    default: {
      return state;
    }
  }
}