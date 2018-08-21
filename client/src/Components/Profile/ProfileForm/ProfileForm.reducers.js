import { avatarModalReducer } from './AvatarModal';

const defaultState = {};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_AVATAR_MODAL':
      return {
        ...state,
        avatarModal: avatarModalReducer(state.avatarModal, action)
      };
    default:
      return state;
  }
};

export default profile;
