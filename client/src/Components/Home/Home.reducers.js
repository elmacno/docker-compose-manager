const defaultState = {
  availableContainers: [],
  runningContainers: []
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'AVAILABLE_CONTAINERS':
      return {
        ...state,
        availableContainers: action.payload
      };
    case 'RUNNING_CONTAINERS':
      return {
        ...state,
        runningContainers: action.payload
      };
    default:
      return state;
  }
};

export default home;
