import projectInfo from './ProjectInfo/ProjectInfo.reducers';

const defaultState = {
  expandedProjects: []
};

const projectsList = (state = defaultState, action) => {
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
      return {
        ...state,
        projectInfo: projectInfo(state.projectInfo, action)
      };
  }
};

export default projectsList;
