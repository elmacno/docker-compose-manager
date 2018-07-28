import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    containers: state.home.containers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setContainers: containers =>
        dispatch({ type: 'CONTAINERS', payload: containers })
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
