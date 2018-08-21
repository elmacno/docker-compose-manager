import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.modal.dialogs[ownProps.key].isOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      open: () =>
        dispatch({ type: 'OPEN_MODAL_DIALOG', modalId: ownProps.key }),
      close: () =>
        dispatch({ type: 'CLOSE_MODAL_DIALOG', modalId: ownProps.key })
    },
    dispatch
  );

const defaultModalDialogState = {
  isOpen: false
};

const modalDialogReducer = (state = defaultModalDialogState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL_DIALOG':
      return {
        ...state,
        isOpen: true
      };
    case 'CLOSE_MODAL_DIALOG':
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

const defaultModalDialogsState = {
  dialogs: {}
};

const modalDialogsReducer = (state = defaultModalDialogsState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL_DIALOG':
    case 'CLOSE_MODAL_DIALOG':
      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [action.key]: modalDialogReducer(state.dialogs[action.key], action)
        }
      };
    default:
      return state;
  }
};

export { mapStateToProps, mapDispatchToProps, modalDialogsReducer };
