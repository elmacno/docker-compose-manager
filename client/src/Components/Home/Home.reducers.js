import projectsList from './ProjectsList/ProjectsList.reducers';

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
      return {
        ...state,
        [action.modal]: {
          isOpen: action.payload
        }
      };
    default:
      return state;
  }
};

const containers = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
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
        containers: action.payload
      };
    case 'TOGGLE_MODAL':
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
      return {
        ...state,
        projects: projects(state.projects, action)
      };
    default:
      return state;
  }
};

export default home;
