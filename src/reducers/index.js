import { combineReducers } from 'redux';
import { ui } from './ui';
import { bingo } from './bingo';
import { cardGame } from './cardGame';
import { auth } from './auth';

export default combineReducers({
  ui,
  bingo,
  cardGame,
  auth,
});
