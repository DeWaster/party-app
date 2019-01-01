import config from '../config';
import { updateHighlights } from '../util/bingoUtils';

const initialState = {
  bingoGrid: [[]],
  bingoStatus: [[]],
};

export function bingo(state = initialState, action) {
  switch (action.type) {
    case 'INITIALISE_GRID':
      // Initiliase texts
      let grid = [];
      const bingoTexts = config.apps.bingo.texts.slice(0);

      for (let i = 0; i < 5; i++) {
        grid.push([]);
        for (let j = 0; j < 5; j++) {
          let textPos = Math.floor(
            Math.random() * Math.floor(bingoTexts.length - 1)
          );
          const text = bingoTexts.splice(textPos, 1)[0];
          grid[i].push(text);
        }
      }

      // Initiliase statuses
      let statusGrid = [];

      for (let i = 0; i < 5; i++) {
        statusGrid.push([]);
        for (let j = 0; j < 5; j++) {
          statusGrid[i].push({
            pressed: false,
            highlight: false,
          });
        }
      }
      return {
        ...state,
        bingoGrid: grid,
        bingoStatus: statusGrid,
      };

    case 'TOGGLE_BOX':
      const { col, row } = action.payload;

      const newStatusGrid = [...state.bingoStatus];
      newStatusGrid[row][col]['pressed'] = !newStatusGrid[row][col]['pressed'];

      return {
        ...state,
        bingoStatus: updateHighlights(newStatusGrid),
      };
    default:
      return state;
  }
}
