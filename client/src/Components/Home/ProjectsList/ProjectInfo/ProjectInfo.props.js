import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    containers:
      state.home.projectsList.projectInfo.containers[ownProps.projectName]
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      setContainers: containers =>
        dispatch({
          type: `SET_CONTAINERS`,
          projectName: ownProps.projectName,
          payload: containers
        })
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
