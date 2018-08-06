import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    expandedProjects: state.home.projectsList.base.expandedProjects
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      expandProject: project =>
        dispatch({ type: 'EXPAND_PROJECT', payload: project }),
      collapseProject: project =>
        dispatch({ type: 'COLLAPSE_PROJECT', payload: project })
    },
    dispatch
  );

const addProps = Home => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
};

export { addProps };
