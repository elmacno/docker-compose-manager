import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from '../../Components/Login/Login.reducers';
import home from '../../Components/Home/Home.reducers';
import { profile } from '../../Components/Profile';
import { modalDialogsReducer as modalDialogs } from '../../Components/Modal';

export default combineReducers({
  login,
  home,
  profile,
  modalDialogs,
  form: formReducer
});
