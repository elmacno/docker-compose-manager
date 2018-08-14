const defaultState = {
  logs: ''
};

const projectLogs = (state = defaultState, action) => {
  switch (action.type) {
    case 'INFO':
      return {
        ...state,
        info: action.payload
      };
    case 'LOGS':
      return {
        ...state,
        logs: action.payload
      };
    default:
      return state;
  }
};

export default projectLogs;
