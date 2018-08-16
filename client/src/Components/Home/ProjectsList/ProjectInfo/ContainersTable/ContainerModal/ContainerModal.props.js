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
      isOpen: false
    };
  }
  return {
    isOpen: state.home.projects[ownProps.project].containers.filter(
      container => container.Id === ownProps.container
    )[0][ownProps.modalType].isOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      setIsOpen: value =>
        dispatch({
          type: 'TOGGLE_MODAL',
          project: ownProps.project,
          container: ownProps.container,
          modal: ownProps.modalType,
          payload: value
        })
    },
    dispatch
  );

const addProps = ContainerModal => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContainerModal);
};

export { addProps };
