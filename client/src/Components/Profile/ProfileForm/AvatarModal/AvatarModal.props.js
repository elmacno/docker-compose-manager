import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

const addProps = AvatarModal => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AvatarModal);
};

export { addProps };
