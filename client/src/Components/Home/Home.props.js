import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    availableContainers: state.home.availableContainers,
    runningContainers: state.home.runningContainers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAvailableContainers: containers =>
        dispatch({ type: 'AVAILABLE_CONTAINERS', payload: containers }),
      setRunningContainers: containers =>
        dispatch({ type: 'RUNNING_CONTAINERS', payload: containers })
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
