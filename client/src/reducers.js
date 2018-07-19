import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from './Login/Login.reducers';

export default combineReducers({
  login,
  form: formReducer
});
