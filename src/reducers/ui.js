const initialState = {
  showSidepanel: false,
};

export function ui(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEPANEL':
      return {
        ...state,
        showSidepanel: !state.showSidepanel,
      };
    default:
      return state;
  }
}
