import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  if (
    !state.home.projects[ownProps.project] ||
    !state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0] ||
    !state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0][ownProps.modalType]
  ) {
    return {
      logs: ''
    };
  }
  return {
    logs: state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0][ownProps.modalType].logs
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      addLogs: logs =>
        dispatch({
          type: 'ADD_MODAL_LOGS',
          container: ownProps.container,
          modal: ownProps.modalType,
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
