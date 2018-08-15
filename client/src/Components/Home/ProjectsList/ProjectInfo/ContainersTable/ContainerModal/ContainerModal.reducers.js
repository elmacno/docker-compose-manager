const defaultState = {
  isOpen: {}
};

const containerModal = (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_OPEN':
      return {
        ...state,
        isOpen: { ...state.isOpen, [action.key]: action.payload }
      };
    default:
      return state;
  }
};

export default containerModal;
