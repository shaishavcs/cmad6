import {
    USER_REGISTRATION_FAILED,
    LOGIN_FAILED,
    PASSWORD_CHANGE_MISMATCH
} from "../actions/ActionConstants";
import store from '../store/blogger_store';

const initialState = {};
export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                loginFailed: true
            });
        case USER_REGISTRATION_FAILED:
            return Object.assign({}, state, {
                userRegistered: false
            });
        case PASSWORD_CHANGE_MISMATCH:
        console.log('Password Change mismatch:');
            return Object.assign({}, state, {
                currentPasswordMismatch: true
            });
        default:
            return Object.assign({}, state);
    }
}