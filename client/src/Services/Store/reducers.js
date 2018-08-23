import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import home from '../../Components/Home/Home.reducers';
import { profile } from '../../Components/Profile';
import { modalDialogsReducer as modalDialogs } from '../../Components/Modal';

export default combineReducers({
  home,
  profile,
  modalDialogs,
  form: formReducer
});
