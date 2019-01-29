const initialState = {
  showSidepanel: false,
  showAppMenu: false,
  showConfirmation: false,
  showBubble: false,
  bubbleMessage: '',
  bubbleType: 'info',
  showAuthError: false,
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
    case 'SHOW_BUBBLE':
      return {
        ...state,
        showBubble: true,
      };
    case 'CLOSE_BUBBLE':
      return {
        ...state,
        showBubble: false,
      };
    case 'CHANGE_BUBBLE_MESSAGE':
      return {
        ...state,
        bubbleMessage: action.payload,
      };
    case 'CHANGE_BUBBLE_TYPE':
      return {
        ...state,
        bubbleType: action.payload,
      };
    case 'LOGIN/FAILED':
      return {
        ...state,
        showAuthError: true,
      };
    case 'LOGIN/FETCH':
      return {
        ...state,
        showAuthError: false,
      };
    default:
      return state;
  }
}
