import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      toggleStatsModal: (container, value) =>
        dispatch({
          type: 'TOGGLE_MODAL',
          container: container,
          modal: 'statsModal',
          payload: value
        }),
      toggleLogsModal: (container, value) =>
        dispatch({
          type: 'TOGGLE_MODAL',
          container: container,
          modal: 'logsModal',
          payload: value
        }),
      toggleTerminalModal: (container, value) =>
        dispatch({
          type: 'TOGGLE_MODAL',
          container: container,
          modal: 'terminalModal',
          payload: value
        })
    },
    dispatch
  );

const addProps = ContainersTable => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContainersTable);
};

export { addProps };
