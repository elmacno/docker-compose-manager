import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    projects: state.home.projects
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setProjects: projects => dispatch({ type: 'PROJECTS', payload: projects })
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
