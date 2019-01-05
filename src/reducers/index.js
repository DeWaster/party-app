import { combineReducers } from 'redux';
import { ui } from './ui';
import { bingo } from './bingo';
import { cardGame } from './cardGame';

export default combineReducers({
  ui,
  bingo,
  cardGame,
});
