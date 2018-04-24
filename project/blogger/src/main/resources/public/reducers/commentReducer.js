import { COMMENT_CREATION_FAILED, COMMENT_ADDED_SUCCESSFULLY, COMMENTS_LIST, ADD_COMMENT } from "../actions/ActionConstants.js";


// const initialState = {initialValues: null, loginSuccessful: false};
const initialState = {};
export default function commentReducer(state=initialState, action){
    console.log('commentReducer: action?:'+action);
    let newState = state;
    switch(action.type) {
        case COMMENT_CREATION_FAILED:
            return Object.assign({}, state, {comments: {commentCreatedSuccessfully: true}});
        case COMMENT_ADDED_SUCCESSFULLY:
            return Object.assign({}, state, {comments: action.comments, commentCreatedSuccessfully: true});
        case COMMENTS_LIST:
            alert('Got the ListAllComments action triggered.'+JSON.stringify(action.comments));
            return Object.assign({}, state, {comments:action.comments});
        // case ADD_COMMENT:
        //     return Object.assign({}, state, {comments:action.comment});
        default:
            return state;
    }
};