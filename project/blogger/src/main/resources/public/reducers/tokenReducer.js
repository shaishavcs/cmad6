import { TOKEN_AUTHENTICATION_FAILED, LOGIN_SUCCESSFUL, LOGIN_FAILED, CREATE_PROFILE, EDIT_PROFILE, USER_LOGGED_IN, LOGOUT_SUCCESSFUL, LOGOUT_FAILED } from "../actions/ActionConstants";

const initialState = {};
export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case LOGOUT_SUCCESSFUL:
            return Object.assign({}, state, {auth: {token: undefined, refresh_token: undefined, loginSuccessful: false}})
        case LOGIN_SUCCESSFUL:
            if (action.token) {
                const newState = Object.assign({}, state, {auth:{token: action.token.access_token, loginSuccessful: true, refresh_token: action.token.refresh_token}});
                return newState;
            } else {
                return Object.assign({}, state);
            }
        case LOGIN_FAILED:
            return Object.assign({}, state, {auth:{token: null, refresh_token: undefined, loginSuccessful: false}});
        case TOKEN_AUTHENTICATION_FAILED:
            return Object.assign({}, state, {auth:{token: null, refresh_token: undefined, loginSuccessful: false}});
        default:
            return state;
    }
}