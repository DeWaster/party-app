export const loginFetch = password => ({
  type: 'LOGIN/FETCH',
  payload: password,
});

export const loginFailed = e => ({
  type: 'LOGIN/FAILED',
  payload: e,
});

export const loginSuccess = payload => ({
  type: 'LOGIN/SUCCESS',
  payload,
});

export const loginInit = password => ({
  type: 'LOGIN/INIT',
});
