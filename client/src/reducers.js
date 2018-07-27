import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from './Login/Login.reducers';
import home from './Home/Home.reducers';

export default combineReducers({
  login,
  home,
  form: formReducer
});
