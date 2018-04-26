import { COMMENT_CREATION_FAILED, COMMENT_ADDED_SUCCESSFULLY, COMMENTS_LIST, ADD_COMMENT } from "../actions/ActionConstants.js";

const initialState = {};
export default function commentReducer(state=initialState, action){
    let newState = state;
    switch(action.type) {
        case COMMENT_CREATION_FAILED:
            return Object.assign({}, state, {comments: {commentCreatedSuccessfully: true}});
        case COMMENT_ADDED_SUCCESSFULLY:
            window.location.reload();
            return Object.assign({}, state, {comments: action.comments, commentCreatedSuccessfully: true});
        case COMMENTS_LIST:
            return Object.assign({}, state, {comments:action.comments});
        default:
            return state;
    }
};