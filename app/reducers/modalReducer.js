import store from '../store';

export default function reducer(state = {
    open: false,
    content: {
      header: "Game request",
      body: "Player ... wants to play with you.",
      footer: null,
      success: false,
      danger: false
    },
    success: {
      handler: false,
      arguments: false
    },
    callback: null,
    callbackArg: null
  }, action) {
  
  switch(action.type) {
    case 'MODAL_OPEN': {
      return { ...state, open: true, callback: action.payload };
    }
    
    case 'MODAL_CLOSE': {
      return { ...state, open: false, closeCallback: null };
    }
    
    case 'GAME_REQUEST_SENT':
      return {
        ...state,
        callbackArg: action.payload.gameKey,
        content: {
          header: action.payload.content.header,
          body: action.payload.content.body,
          danger: action.payload.content.danger,
          success: false
        }
      };

    case 'GAME_REQUEST_ACCEPTED':
      return {
        ...state,
        open: false
      }

    case 'GAME_REMOVED':
      return {
        ...state,
        open: false
      };
      
    case 'GAME_ADDED':
      return {
        ...state,
        open: true,
        callback: action.payload.rejectGame,
        callbackArg: action.payload.gameKey,
        success: {
          handler: action.payload.successHandler
        },
        content: {
          header: action.payload.content.header,
          body: action.payload.content.body,
          danger: action.payload.content.danger,
          success: action.payload.content.success
        }
      };
  }
  
  return state;
}