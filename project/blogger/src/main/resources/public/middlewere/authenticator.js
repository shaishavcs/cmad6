import { LOGOUT_SUCCESSFUL, TOKEN_AUTHENTICATION_FAILED } from "../actions/ActionConstants";

const authenticator = store => next => action => {
	let ret = next(action);
    switch(action.type) {
        case LOGOUT_SUCCESSFUL:
            console.log("arrowlogger::post:store:", store.getState());
            window.location.replace("/");
            return ret;
        case TOKEN_AUTHENTICATION_FAILED:
            console.log("arrowlogger::post:store:", store.getState());
            window.location.replace("/login");
            return ret;
        default: 
            return ret;
    }
};
export default authenticator;
