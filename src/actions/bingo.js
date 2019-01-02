export const toggleBox = position => ({
  type: 'TOGGLE_BOX',
  payload: position,
});

export const initialiseGrid = () => ({
  type: 'INITIALISE_GRID',
});
