const initialState = {
  showSidepanel: false,
  showAppMenu: false,
};

export function ui(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEPANEL':
      return {
        ...state,
        showSidepanel: !state.showSidepanel,
      };
    case 'CLOSE_APP_MENU':
      return {
        ...state,
        showAppMenu: false,
      };
    case 'OPEN_APP_MENU':
      return {
        ...state,
        showAppMenu: true,
      };
    default:
      return state;
  }
}
