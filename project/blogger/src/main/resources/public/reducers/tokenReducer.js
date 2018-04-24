import { LOGIN_SUCCESSFUL, LOGIN_FAILED, CREATE_PROFILE, EDIT_PROFILE, USER_LOGGED_IN, LOGOUT_SUCCESSFUL, LOGOUT_FAILED } from "../actions/ActionConstants";

const initialState = {};
export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case LOGOUT_SUCCESSFUL:
            return Object.assign({}, state, {auth: {token: undefined, refresh_token: undefined, loginSuccessful: false}})
        case LOGIN_SUCCESSFUL:
            if (action.token) {
                // alert('TokenReducer:LOGIN_SUCCESSFUL:action.user.token:'+JSON.stringify(action.token));
                const newState = Object.assign({}, state, {auth:{token: action.token.access_token, loginSuccessful: true, refresh_token: action.token.refresh_token}});
                // alert('TokenReducer:LOGIN_SUCCESSFUL:newState:'+JSON.stringify(newState));
                return newState;
            } else {
                return Object.assign({}, state);
            }
        case LOGIN_FAILED:
            // alert('TokenReducer:LOGIN_FAILED:action:'+JSON.stringify(action));
            return Object.assign({}, state, {auth:{token: null, refresh_token: undefined, loginSuccessful: false}});
        default:
            return state;
    }
}