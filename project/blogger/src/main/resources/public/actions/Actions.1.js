import axios from 'axios';
import { LOGGED_IN_USER, ADD_BLOG, UPDATE_BLOG, BLOG_LIST, LIST_ALL_BLOGS, EDIT_BLOG, COMMENTS_LIST, ADD_LIKE } from "./ActionConstants";
// import { normalize, schema } from 'normalizr';
import fetch from 'isomorphic-fetch';
import store from '../store/blogger_store.js';


export function loginUser(user) {
    alert('Actions:loginUser:'+JSON.stringify(user));
    return {
        type: LOGGED_IN_USER,
        user: user
    };
}

export function addBlog(blog) {
    return {
        type: ADD_BLOG,
        blog: blog
    };
}

export function updateBlogView(blog) {
    return {
        type: UPDATE_BLOG,
        blog: blog
    };
}

export function listBlogs(user) {
    return {
        type: BLOG_LIST,
        user: user
    };
}

export function listAllBlogs(blogs) {
    // alert('ACtions:listOfBlogs:'+JSON.stringify(blogs));
    return {
        type: LIST_ALL_BLOGS,
        blogs: blogs
    };
}

export function editBlog(blog) {
    alert('editBlog Action dispatching:blog:'+JSON.stringify(blog));
    return {
        type: BLOG_EDIT,
        blog: blog
    };
}

export function listComments(blogId) {
    return {
        type: COMMENTS_LIST,
        blogId: blogId
    };
}
export function registeredSuccessfully() {
    return {
        type: USER_REGISTERED_SUCCESSFULLY
    }
}

export function logout(user) {
    return (dispatch) => {
        fetch(`rest/user/logout/${user.userId}`)
        .then(function(response) {
            // return dispatch(logout);
        });
    }
}

export function loginOAuth(username, password) {
    // alert('Actions.login:user:pass:'+JSON.stringify(credentials));
    // return (dispatch) => {
        fetch("http://localhost:8082/oauth/token", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",                  
              }, 
            body: {
                "username": username,
                "password": password,
                "client_id": "bloggerjwtclientid",
                "client_secret": "bloggerXYZ2808",
                "grant_type": "password",
                "scope": "read write"
            }
        }).then((response) => {
            alert('login:response:'+JSON.stringify(response));
            return response.json();
        }).then((user) => dispatch(loginUser(user)));
    // }
}

export function loginUser(credentials) {
    fetch("/rest/user/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",                  
          }, 
        body: JSON.stringify(credentials)
    }).then((response) => {
        // const userResource = response.json();
        // alert('login:response:'+JSON.stringify(userResource));
        return response.json();
    }).then((userResource) => {
        console.log(userResource);
        store.dispatch(loginUserSuccessful(userResource));
        // return userResource;
    });        
}

export function updateBlog(blog) {
    return (dispatch) => {
        fetch(`/blog/update`, {
              method: 'post',
              data: blog
          }).then(function(response){
              return dispatch(updateBlogView(blog));
              // do nothing for now.
          });
      };
  }

export function registerUser(user){
    // alert("Actions: registerUser:user?"+JSON.stringify(user));
    return (dispatch) => {
        fetch("/rest/user/register", {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",                  
            },
            body: JSON.stringify(user)
        }).then((response) => {
            return response.json();
        }).then((user) => dispatch(loginUser(user)));
            // do nothing for now.
        // });
    };
    // return apiCall;
    // return (dispatch) => {
    //   fetch(`/user/register`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //         body: JSON.stringify(user)
    //     }).then(function(response){
    //         // return dispatch(loginUser(user));
    //         // do nothing for now.
    //     });
    // };
}

export function updateUser(user){
    return (dispatch) => {
      fetch(`/rest/user/update/${user.userId}`, {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
             data: user
        }).then(function(response){
            // do nothing
        });
    };
}

// Not used currently - No axios being used
export function fetchAllBlogsFromServer() {
    alert('Actions:fetchAllBlogsFromServer being called.');
    const request = axios({
        method: 'get',
        url: `rest/blog/list`,
        headers: []
      });
    //   alert('Actions:fetchAllBlogsFromServer:'+JSON.stringify(request));
      listAllBlogs(request);
    //   return {
    //     type: FETCH_POSTS,
    //     payload: request
    //   };
    
    // return (dispatch) => {
    //     fetch(`/rest/blog/list`)
    //     .then((response) => {
    //             alert('Actions:fetchAllBlogsFromServer:'+JSON.stringify(response));
    //             return response;
    //     }).then((response) => dispatch(listAllBlogs(response)));
    // };
}

export function fetchBlogFromServer(blogId) {
    const url = "/rest/blog/edit/"+blogId;
    alert('Actions:fetchBlogFromServer being called.url to call:'+url);
    // fetchBlogsFromServer();
    fetch(url, {
        method: "post",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",                  
        },
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYmxvZ2dlcmp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoic2FuanViaGFpIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTUyMjc1NTQ5MywiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiI2NTg5NTljYy02MTRjLTQxZmYtODg5NS0yYmQ1ZmE4NTQxZmQiLCJjbGllbnRfaWQiOiJibG9nZ2Vyand0Y2xpZW50aWQifQ.0ERP6Z3vTr16RGaw0fmhTxrJY3XMbQtiTKT7A0YIMrA",
        'Content-Type': 'application/json'
    })
    .then((response) => {
        alert('Response from edit/blog is:'+JSON.stringify(response));
            return response.json();
    }).then((blog) => dispatch(editBlog(blog)));
    // alert('Actions:fetchBlogFromServer:'+JSON.stringify(request));
    // const request = axios({
    //     method: 'get',
    //     url: `rest/blog/edit/`+blogId,
    //     headers: []
    //   });
    //   alert('Actions:fetchBlogFromServer:'+JSON.stringify(request));
    //   listAllBlogs(request);
}

// return (dispatch) => {
//     fetch("/rest/user/register", {
//         method: "post",
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json",
//             "Accept": "application/json",                  
//         },
//         body: JSON.stringify(user)
//     }).then((response) => {
//         return response.json();
//     }).then((user) => dispatch(loginUser(user)));
//         // do nothing for now.
//     // });
// };

export function fetchBlogsFromServer() {
    alert('Actions:fetchBlogsFromServer being called....url to call:');
    return (dispatch) => {
        fetch("/rest/blog/list")
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(listAllBlogs(blogs)));
    };
}

export function fetchBlogsForUserFromServer(user) {
    return (dispatch) => {
        fetch(`/rest/user/blogs/${user.userId}`)
        .then((response) => {
                return response.json();
        }).then((blogs) => dispatch(listBlogs(user)));
    };
}

export function fetchCommentsFromServer(blogId) {
    return (dispatch) => {
        fetch(`/rest/blog/comment/${blogId}`)
        .then((response) => {
                return response.json();
        }).then((comments) => dispatch(listComments(blogId)));
    };
}
