import { COMMENT_CREATION_FAILED, COMMENT_ADDED_SUCCESSFULLY, ADD_COMMENT, LIST_ALL_BLOGS, LIST_BLOG, EDIT_BLOG, BLOG_CREATED, CREATE_BLOG_FAILED, EDIT_BLOG_FAILED, BLOG_UPDATED } from "../actions/ActionConstants.js";

const INITIAL_STATE = { blogList: {blogs: [], error:null, loading: false},  
newBlog:{blog:null, error: null, loading: false}, 
editBlog:{blog:null, error: null, loading: false}, 
activeBlog:{blog:null, error:null, loading: false}, 
};

// const initialState = {initialValues: null, loginSuccessful: false};
const initialState = {};
export default function blogReducer(state=initialState, action){
    let newState = state;
    switch(action.type) {
        case LIST_ALL_BLOGS:
            // let newState = action.blogs;
            // alert('Got the ListAllBlogs action triggered.'+JSON.stringify(action.blogs));
            // let blogList = action.blogs;
            // nextState.blogs = blogList;
            // Below was good 
            // return Object.assign(newState, state, action.blogs, {loginSuccessful: false});
            return Object.assign({}, state, {blogs:action.blogs});
            // alert('Got the ListAllBlogs action triggered.blogList?:'+JSON.stringify(newState));
            // return newState;
    case EDIT_BLOG:
        return Object.assign({}, state, {blog:action.blog});
    case EDIT_BLOG_FAILED:
        return Object.assign({}, state, {blog:action.blog, blogUpdated: false});
    case BLOG_UPDATED:
            // blogList = [...state.blogs, action.blog];
        return Object.assign({}, state, {blog: action.blog, blogUpdated: true});
    case BLOG_CREATED:
            // blogList = [...state.blogs, action.blog];
        return Object.assign({}, state, {blog: action.blog, blogCreated: true});
    case CREATE_BLOG_FAILED:
        // blogList = [...state.blogs, action.blog];
        return Object.assign({}, state);
    // case ADD_COMMENT:
    //     return Object.assign({}, state, {comments:action.comment});
    // let commentsList = [...state.comments, action.comment];
    //         return {
    //             comments: commentsList
    //         };
        default:
            return state;
    }
};

// case COMMENT_CREATION_FAILED:
// return Object.assign({}, state, {commentCreatedSuccessfully: true});
// case COMMENT_ADDED_SUCCESSFULLY:
// return Object.assign({}, state, {commentCreatedSuccessfully: false});
