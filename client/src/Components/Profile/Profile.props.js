import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.profile.user,
    isEditing: state.profile.isEditing
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser: value => dispatch({ type: 'SET_USER', payload: value }),
      setIsEditing: value =>
        dispatch({ type: 'SET_IS_EDITING', payload: value })
    },
    dispatch
  );

const addProps = Profile => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);
};

export { addProps };
