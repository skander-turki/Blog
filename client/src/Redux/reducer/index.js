import { combineReducers } from 'redux';

import userReducer from './user';
import postReducer from './posts';
import tagReducer from './tags';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  tagReducer
});
export default rootReducer;
