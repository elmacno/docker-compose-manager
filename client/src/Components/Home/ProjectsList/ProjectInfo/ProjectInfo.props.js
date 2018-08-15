import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    containers: state.home.projects[ownProps.project].containers
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      setContainers: containers =>
        dispatch({
          type: `SET_CONTAINERS`,
          project: ownProps.project,
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
