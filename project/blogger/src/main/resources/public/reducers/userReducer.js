import { LOGOUT_SUCCESSFUL, USER_REGISTERED_SUCCESSFULLY, USER_REGISTRATION_FAILED, LOGIN_SUCCESSFUL, LOGIN_FAILED, CREATE_PROFILE, EDIT_PROFILE, USER_LOGGED_IN, PROFILE_UPDATE_FAILED, PROFILE_UPDATED, PASSWORD_CHANGE_MISMATCH } from "../actions/ActionConstants";
import store from '../store/blogger_store';

const initialState = {};
export default function userReducer(state=initialState, action) {
    // alert('UserReducer: action:'+JSON.stringify(action));
    // alert('currentstate:'+JSON.stringify(newState));
    switch(action.type) {
        case PASSWORD_CHANGE_MISMATCH:
            return Object.assign({}, store.getState(), {user: action.user, currentPasswordMismatch: true})
        case PROFILE_UPDATED:
            return Object.assign({}, state, {user: action.user, profileUpdated: true})
        case PROFILE_UPDATE_FAILED:
            return Object.assign({}, state, {user: action.user, profileUpdated: false})
        case LOGOUT_SUCCESSFUL:
            return Object.assign({}, state, {user: undefined})
        case USER_REGISTRATION_FAILED:
            let newState = Object.assign({}, state, {user: undefined, userRegistered: false});
            return newState;
        case USER_REGISTERED_SUCCESSFULLY:
            newState = Object.assign({}, state, {user: undefined, userRegistered: true});
            return newState;
        // case "persist/REHYDRATE":
        // alert('REHYDRATING: action:'+JSON.stringify(action));
        // alert('REHYDRATING: action.payload:'+JSON.stringify(action.payload));
        //     if (action.payload) {
        //         const newState = Object.assign({}, state, action.payload);
        //         alert('REHYDRATED: newState:'+JSON.stringify(newState));
        //     } else {
        //         alert('REHYDRATION FAILED: empty state returned....');
        //         return initialState;
        //     }
        //     return newState;
        case USER_LOGGED_IN:
            newState = Object.assign({}, state, {user:  action.user, profileUpdated: false, userRegistered: false});
            // alert('userReducer:USER_LOGGED_IN:newState:'+JSON.stringify(newState));
            return newState;

        // case LOGIN_SUCCESSFUL:
        //     if (action.token) {
        //         // alert('UserReducer:action.user.token:'+JSON.stringify(action.user.token));
        //         const newState = Object.assign({}, state, {user: action.user, loginSuccessful: true});
        //         alert('newState:'+JSON.stringify(newState));
        //         return newState;
        //     } else {
        //         return Object.assign({}, state);
        //     }
        case LOGIN_FAILED:
            // alert('UserReducer:action:'+JSON.stringify(action));
            return Object.assign({}, state, {user: null});
        case EDIT_PROFILE:
            // alert('UserReducer:action:'+JSON.stringify(action));
            if (action.user) {
                return Object.assign({}, state, {user:  action.user});
            } else {
                return Object.assign({}, state);
            }
    case CREATE_PROFILE:
            // alert('UserReducer:action:'+JSON.stringify(action));
            if (action.user) {
                return Object.assign({}, state, {user:  action.user});
            } else {
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}