import { avatarModalReducer } from './AvatarModal';

const mapStateToProps = () => {};
const mapDispatchToProps = () => {};

const defaultState = {};

const profileFormReducer = (state = defaultState, action) => {
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

export { mapStateToProps, mapDispatchToProps, profileFormReducer };
