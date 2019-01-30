import { combineReducers } from 'redux';
import { ui } from './ui';
import { bingo } from './bingo';
import { cardGame } from './cardGame';
import { auth } from './auth';
import { gallery } from './gallery';

export default combineReducers({
  ui,
  bingo,
  cardGame,
  auth,
  gallery,
});
