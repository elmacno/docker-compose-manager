import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from '../../Components/Login/Login.reducers';
import home from '../../Components/Home/Home.reducers';
import projectLogs from '../../Components/Project/ProjectLogs/ProjectLogs.reducers';

export default combineReducers({
  login,
  home,
  projectLogs,
  form: formReducer
});
