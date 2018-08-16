const arrayToObjectKeys = array => {
  let result = {};
  array.forEach(key => {
    result[key] = {};
  });
  return result;
};

const defaultModalState = {
  isOpen: false,
  logs: ''
};

const modal = (state = defaultModalState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isOpen: action.payload
      };
    case 'SET_MODAL_LOGS':
      return {
        ...state,
        logs: action.payload
      };
    default:
      return state;
  }
};

const defaultContainerState = {};

const container = (state = defaultContainerState, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
    case 'SET_MODAL_LOGS':
      return {
        ...state,
        [action.modal]: modal(state[action.modal], action)
      };
    default:
      return state;
  }
};

const containers = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
    case 'SET_MODAL_LOGS':
      return state.map(item => {
        return item.Id === action.container ? container(item, action) : item;
      });
    default:
      return state;
  }
};

const defaultProjectState = {
  expanded: false,
  containers: []
};

const mergeContainers = (current, incoming) => {
  if (!current) return incoming;
  return incoming.map(container => {
    const previous = current.filter(c => c.Id === container.Id)[0];
    return previous ? { ...previous, ...container } : container;
  });
};

const project = (state = defaultProjectState, action) => {
  switch (action.type) {
    case 'TOGGLE_PROJECT':
      return {
        ...state,
        expanded: action.payload
      };
    case 'SET_CONTAINERS':
      return {
        ...state,
        containers: mergeContainers(state.containers, action.payload)
      };
    case 'TOGGLE_MODAL':
    case 'SET_MODAL_LOGS':
      return {
        ...state,
        containers: containers(state.containers, action)
      };
    default:
      return state;
  }
};

const projects = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_PROJECT':
    case 'SET_CONTAINERS':
    case 'TOGGLE_MODAL':
    case 'SET_MODAL_LOGS':
      return {
        ...state,
        [action.project]: project(state[action.project], action)
      };
    default:
      return state;
  }
};

const defaultHomeState = {
  projects: {}
};

const home = (state = defaultHomeState, action) => {
  switch (action.type) {
    case 'PROJECTS':
      return {
        ...state,
        projects: arrayToObjectKeys(action.payload)
      };
    case 'TOGGLE_PROJECT':
    case 'SET_CONTAINERS':
    case 'TOGGLE_MODAL':
    case 'SET_MODAL_LOGS':
      return {
        ...state,
        projects: projects(state.projects, action)
      };
    default:
      return state;
  }
};

export default home;
