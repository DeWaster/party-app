const initialState = {
  isLogged: false,
  apiKey: '',
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN/INIT':
      const token = localStorage.getItem('token');
      if (token) {
        return {
          ...state,
          isLogged: true,
          apiKey: token,
        };
      } else {
        return state;
      }

    case 'LOGIN/SUCCESS':
      const apiKey = action.payload.apiKey;
      localStorage.setItem('token', apiKey);
      return {
        ...state,
        isLogged: true,
        apiKey: apiKey,
      };
    default:
      return state;
  }
}
