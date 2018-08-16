import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
  if (
    !state.home.projects[ownProps.project] ||
    !state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0] ||
    !state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0]['logsModal']
  ) {
    return {
      logs: ''
    };
  }
  return {
    logs: state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0]['logsModal'].logs
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      addLogs: logs =>
        dispatch({
          type: 'SET_MODAL_LOGS',
          project: ownProps.project,
          container: ownProps.container,
          modal: 'logsModal',
          payload: logs
        })
    },
    dispatch
  );

const addProps = ContainerLogsModal => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContainerLogsModal);
};

export { addProps };
