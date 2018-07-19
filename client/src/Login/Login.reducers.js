const login = (state = {}, action) => {
  switch (action.type) {
    case 'VALUE':
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
};

export default login;
