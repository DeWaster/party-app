const initialState = {
  showSidepanel: false,
  showAppMenu: false,
  showConfirmation: false,
  showError: false,
  errorMessage: '',
};

export function ui(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEPANEL':
      return {
        ...state,
        showSidepanel: !state.showSidepanel,
      };
    case 'OPEN_SIDEPANEL':
      return {
        ...state,
        showSidepanel: true,
      };
    case 'CLOSE_SIDEPANEL':
      return {
        ...state,
        showSidepanel: false,
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
    case 'OPEN_CONFIRMATION':
      return {
        ...state,
        showConfirmation: true,
      };
    case 'CLOSE_CONFIRMATION':
      return {
        ...state,
        showConfirmation: false,
      };
    case 'SHOW_ERROR_SNACK':
      return {
        ...state,
        showError: true,
      };
    case 'CLOSE_ERROR_SNACK':
      return {
        ...state,
        showError: false,
      };
    case 'CHANGE_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
