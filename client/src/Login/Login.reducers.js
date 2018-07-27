const defaultState = {
  isLoggedIn: false
};

const login = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload
      };
    default:
      return state;
  }
};

export default login;
