import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
  return {
    isOpen: state.profile.profileForm.avatarModal.isOpen
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIsOpen: value =>
        dispatch({ type: 'TOGGLE_AVATAR_MODAL', payload: value })
    },
    dispatch
  );

const defaultState = {};

const avatarModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_AVATAR_MODAL':
      return {
        ...state,
        isOpen: action.payload
      };
    default:
      return state;
  }
};

export { mapStateToProps, mapDispatchToProps, avatarModalReducer };
