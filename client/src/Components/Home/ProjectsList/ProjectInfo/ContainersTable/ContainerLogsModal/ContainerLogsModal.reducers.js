const defaultState = {
  prop: ''
};

const containerLogsModal = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROP':
      return {
        ...state,
        prop: action.payload
      };
    default:
      return state;
  }
};

export default containerLogsModal;
