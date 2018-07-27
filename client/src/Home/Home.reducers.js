const defaultState = {
  containers: {}
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'CONTAINERS':
      return {
        ...state,
        containers: action.payload
      };
    default:
      return state;
  }
};

export default home;
