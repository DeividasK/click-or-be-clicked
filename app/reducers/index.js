import { combineReducers } from 'redux';

import user from './userReducer';
import game from './gameReducer';
import players from './playersReducer';
import modal from './modalReducer';

export default combineReducers({
  user,
  game,
  players,
  modal
});