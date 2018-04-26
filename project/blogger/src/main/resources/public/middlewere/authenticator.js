import { LOGOUT_SUCCESSFUL, TOKEN_AUTHENTICATION_FAILED, USER_RETRIEVAL_FAILED, PROFILE_UPDATED } from "../actions/ActionConstants";

const authenticator = store => next => action => {
	let ret = next(action);
    switch(action.type) {
        case LOGOUT_SUCCESSFUL:
            window.location.replace("/");
            return ret;
        case TOKEN_AUTHENTICATION_FAILED:
            console.log("authenticator::window.location.orgin:"+JSON.stringify(window.location.orgin));
            console.log("authenticator::window.location.orgin.indexOf(login):"+JSON.stringify(window.location.orgin).indexOf("/login"));
            if (window.location.origin.indexOf("/login") == -1) {
                console.log("authenticator::redirecting to /login.");
                window.location.replace("/login");
            }
            return ret;
        case USER_RETRIEVAL_FAILED:
            console.log('authenticator:USER_RETRIEVAL_FAILED:');
            window.localStorage.clear();
            return ret;
        case PROFILE_UPDATED:
            window.location.replace("/");
            return ret;
        default: 
            return ret;
    }
};
export default authenticator;
