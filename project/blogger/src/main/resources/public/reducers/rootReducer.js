import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import commentReducer from "./commentReducer";
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
	user: userReducer,
	blogs: blogReducer,
  auth: tokenReducer,
  comments: commentReducer,
  error: errorReducer
  });

export default rootReducer;
  