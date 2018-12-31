import { combineReducers } from 'redux';
import { ui } from './ui';
import { bingo } from './bingo';

export default combineReducers({
  ui,
  bingo,
});
