import { bindActionCreators } from 'redux';
import { profileFormReducer } from './ProfileForm';

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

const defaultState = {
  user: {
    username: '',
    rights: []
  },
  isEditing: false
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_IS_EDITING':
      return {
        ...state,
        isEditing: action.payload
      };
    case 'TOGGLE_AVATAR_MODAL':
      return {
        ...state,
        profileForm: profileFormReducer(state.profileForm, action)
      };
    default:
      return state;
  }
};

export { mapStateToProps, mapDispatchToProps, profileReducer };
