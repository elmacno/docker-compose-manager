import { combineReducers } from 'redux';
import projectInfo from './ProjectInfo/ProjectInfo.reducers';

const defaultState = {
  expandedProjects: []
};

const base = (state = defaultState, action) => {
  switch (action.type) {
    case 'EXPAND_PROJECT':
      return {
        ...state,
        expandedProjects: [
          ...state.expandedProjects.filter(
            project => project !== action.payload
          ),
          action.payload
        ]
      };
    case 'COLLAPSE_PROJECT':
      return {
        ...state,
        expandedProjects: state.expandedProjects.filter(
          project => project !== action.payload
        )
      };
    default:
      return state;
  }
};

export default combineReducers({
  base,
  projectInfo
});
