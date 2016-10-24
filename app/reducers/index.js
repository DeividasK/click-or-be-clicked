import { combineReducers } from 'redux';

import user from './userReducer';
import game from './gameReducer';
import players from './playersReducer';

export default combineReducers({
  user,
  game,
  players,
});