
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  // article,
  // articleList,
  auth,
  user: userReducer,
  // common,
  // editor,
  // home,
  // profile,
  // settings,
  router: routerReducer
});
