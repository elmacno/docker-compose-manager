const defaultState = {
  containers: {}
};

const projectInfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CONTAINERS':
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.projectName]: action.payload
        }
      };
    default:
      return state;
  }
};

export default projectInfo;
