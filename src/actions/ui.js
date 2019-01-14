export const toggleSidepanel = () => ({
  type: 'TOGGLE_SIDEPANEL',
});

export const openSidepanel = () => ({
  type: 'OPEN_SIDEPANEL',
});

export const closeSidepanel = () => ({
  type: 'CLOSE_SIDEPANEL',
});

export const openAppMenu = () => ({
  type: 'OPEN_APP_MENU',
});

export const closeAppMenu = () => ({
  type: 'CLOSE_APP_MENU',
});

export const openConfirmation = () => ({
  type: 'OPEN_CONFIRMATION',
});

export const closeConfirmation = () => ({
  type: 'CLOSE_CONFIRMATION',
});

export const showError = message => ({
  type: 'SHOW_ERROR',
  payload: message,
});

export const showInfo = message => ({
  type: 'SHOW_INFO',
  payload: message,
});

export const hideBubble = () => ({
  type: 'CLOSE_BUBBLE',
});
