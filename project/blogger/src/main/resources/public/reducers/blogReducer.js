import { COMMENT_CREATION_FAILED, COMMENT_ADDED_SUCCESSFULLY, ADD_COMMENT, LIST_ALL_BLOGS, LIST_BLOG, EDIT_BLOG, BLOG_CREATED, CREATE_BLOG_FAILED, EDIT_BLOG_FAILED, BLOG_UPDATED } from "../actions/ActionConstants.js";

const initialState = {};
export default function blogReducer(state=initialState, action){
    let newState = state;
    switch(action.type) {
        case LIST_ALL_BLOGS:
        return Object.assign({}, state, {blogs:action.blogs});
    case EDIT_BLOG:
        return Object.assign({}, state, {blog:action.blog});
    case EDIT_BLOG_FAILED:
        return Object.assign({}, state, {blog:action.blog, blogUpdated: false});
    case BLOG_UPDATED:
        return Object.assign({}, state, {blog: action.blog, blogUpdated: true});
    case BLOG_CREATED:
        return Object.assign({}, state, {blog: action.blog, blogCreated: true});
    case CREATE_BLOG_FAILED:
        return Object.assign({}, state);
        default:
            return state;
    }
};
