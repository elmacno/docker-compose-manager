import { profileFormReducer } from './ProfileForm';

const defaultState = {
  user: {
    username: '',
    rights: []
  },
  isEditing: false
};

const profile = (state = defaultState, action) => {
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

export default profile;
