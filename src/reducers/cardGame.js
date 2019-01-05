import config from '../config';
import { suffleArray } from '../util/cardUtils';

const initialState = {
  pack: [],
  currentCard: {
    suit: 'back',
    number: 0,
  },
  emptyPack: false,
};

const suits = ['spade', 'heart', 'diamond', 'club'];
const numbers = ['king', 'queen', 'jack', 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export function cardGame(state = initialState, action) {
  switch (action.type) {
    case 'INITIALISE_PACK': {
      const newPack = [];
      suits.map(suit => {
        numbers.map(number => {
          newPack.push({ suit, number });
        });
      });
      return {
        ...state,
        pack: suffleArray(newPack),
        currentCard: {
          suit: 'back',
          number: 0,
        },
      };
    }

    case 'NEW_CARD': {
      if (state.pack.length === 0) {
        return {
          ...state,
          emptyPack: true,
        };
      }
      const newPack = [...state.pack];
      const newCard = newPack.splice(0, 1)[0];

      return {
        ...state,
        pack: newPack,
        currentCard: newCard,
      };
    }

    default:
      return state;
  }
}
