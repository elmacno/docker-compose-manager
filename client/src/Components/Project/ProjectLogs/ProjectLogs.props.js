import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    info: state.projectLogs.info,
    logs: state.projectLogs.logs
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setInfo: info => dispatch({ type: 'INFO', payload: info }),
      setLogs: logs => dispatch({ type: 'LOGS', payload: logs })
    },
    dispatch
  );

const addProps = ProjectLogs => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectLogs);
};

export { addProps };
