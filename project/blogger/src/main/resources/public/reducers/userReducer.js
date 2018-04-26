import { USER_RETRIEVAL_FAILED, LOGOUT_SUCCESSFUL, USER_REGISTERED_SUCCESSFULLY, USER_REGISTRATION_FAILED, LOGIN_SUCCESSFUL, LOGIN_FAILED, CREATE_PROFILE, EDIT_PROFILE, USER_LOGGED_IN, PROFILE_UPDATE_FAILED, PROFILE_UPDATED, PASSWORD_CHANGE_MISMATCH, TOKEN_AUTHENTICATION_FAILED } from "../actions/ActionConstants";
import store from '../store/blogger_store';

const initialState = {};
export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case PROFILE_UPDATED:
            return Object.assign({}, state, {user: action.user, profileUpdated: true});
        case PROFILE_UPDATE_FAILED:
            return Object.assign({}, state, {user: action.user});
        case LOGOUT_SUCCESSFUL:
            return Object.assign({}, state, {user: undefined});
        case USER_RETRIEVAL_FAILED:
            return Object.assign({}, state, {user: null} );
        case USER_REGISTRATION_FAILED:
            let newState = Object.assign({}, state, {user: undefined});
            return newState;
        case USER_REGISTERED_SUCCESSFULLY:
            newState = Object.assign({}, state, {user: action.user});
            return newState;
        case USER_LOGGED_IN:
            newState = Object.assign({}, state, {user:  action.user});
            return newState;
        case LOGIN_FAILED:
            return Object.assign({}, state, {user: null});
        case EDIT_PROFILE:
            if (action.user) {
                return Object.assign({}, state, {user:  action.user});
            } else {
                return Object.assign({}, state);
            }
        case CREATE_PROFILE:
            if (action.user) {
                return Object.assign({}, state, {user:  action.user});
            } else {
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}