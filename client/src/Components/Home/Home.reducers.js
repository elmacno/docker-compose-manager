import { combineReducers } from 'redux';
import projectsList from './ProjectsList/ProjectsList.reducers';

const defaultState = {
  projects: []
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case 'PROJECTS':
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  base,
  projectsList
});
