import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
	user: userReducer,
	blogs: blogReducer,
  auth: tokenReducer,
  comments: commentReducer
  });
  
  // const rootReducer = (state, action) => {
	// const newState = state;
	// alert('rootReducer:newState:'+JSON.stringify(newState));
	// //	put authentication stuff here
	// return appReducer(newState, action);
  // };
	
	const reducer = (state = {}, action) => {
		alert('rootReducer:persist/Rehydrate action handler:action?'+JSON.stringify(action));
    switch(action.type){        
        case "persist/REHYDRATE": {
            const data = action.payload;
                if (data) return Object.assign(state, data.auth);
        }
    }
}
  export default rootReducer;
  