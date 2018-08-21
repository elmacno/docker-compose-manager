const defaultState = {};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_AVATAR_MODAL':
      return {
        ...state,
        isOpen: action.payload
      };
    default:
      return state;
  }
};

export default profile;
