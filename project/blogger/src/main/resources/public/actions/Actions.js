import { USER_RETRIEVAL_FAILED, BLOG_UPDATED, PASSWORD_CHANGE_MISMATCH, PROFILE_UPDATE_FAILED, PROFILE_UPDATED, COMMENT_ADDED_SUCCESSFULLY, COMMENT_CREATION_FAILED, USER_REGISTERED_SUCCESSFULLY, USER_REGISTRATION_FAILED, USER_LOGGED_IN, PASSWORD_CHANGE_SUCCESSFUL, PASSWORD_CHANGE_FAILED, LOGIN_SUCCESSFUL, LOGIN_FAILED, BLOG_CREATED, CREATE_BLOG_FAILED, UPDATE_BLOG, BLOG_LIST, LIST_ALL_BLOGS, EDIT_BLOG, COMMENTS_LIST, ADD_LIKE, LOGOUT_SUCCESSFUL, EDIT_BLOG_FAILED, TOKEN_AUTHENTICATION_FAILED } from "./ActionConstants";
import fetch from 'isomorphic-fetch';
import store from '../store/blogger_store.js';


export function updateProfileFailed(profileResponse) {
    return {
        type: PROFILE_UPDATE_FAILED,
        user: profileResponse
    }
}

export function profileUpdated(profileResponse) {
    return {
        type: PROFILE_UPDATED,
        user: profileResponse
    }
}

export function retrieveUserFailed() {
    return {
        type: USER_RETRIEVAL_FAILED
    }
}

export function registerUserFailed() {
    return {
        type: USER_REGISTRATION_FAILED
    }
}

export function registeredSuccessfully() {
    return {
        type: USER_REGISTERED_SUCCESSFULLY
    }
}

export function commentAddFailed(comment) {
    return {
        type: COMMENT_CREATION_FAILED,
        comment: comment
    }
}
export function commentAdded(comments) {
    return {
        type: COMMENT_ADDED_SUCCESSFULLY,
        comments: comments
    }
}

export function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        user: user
    }
}
export function tokenAuthenticationFailed() {
    return {
        type: TOKEN_AUTHENTICATION_FAILED
    }
}
export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}

export function loginUserSuccessful(token) {
    return {
        type: LOGIN_SUCCESSFUL,
        token: token
    };
}

export function listAllBlogs(blogs) {
    return {
        type: LIST_ALL_BLOGS,
        blogs: blogs
    };
}

export function logoutSuccessful(user) {
    return {
        type: LOGOUT_SUCCESSFUL,
        user: user
    }
}

export function passwordChangeSuccessful(user) {
    return {
        type: PASSWORD_CHANGE_SUCCESSFUL,
        user: user
    }
}

export function passwordChangeMismatch(user) {
    return {
        type: PASSWORD_CHANGE_MISMATCH,
        user: user
    }
}

export function passwordChangeFailed(user) {
    return {
        type: PASSWORD_CHANGE_FAILED,
        user: user
    }
}

export function editBlog(blog) {
    return {
        type: EDIT_BLOG,
        blog: blog
    };
}

export function editBlogFailed(blog) {
    return {
        type: EDIT_BLOG_FAILED,
        blog: blog
    };
}
export function blogCreated(blog) {
    return {
        type: BLOG_CREATED,
        blog: blog
    };
}
export function blogUpdated(blog) {
    return {
        type: BLOG_UPDATED,
        blog: blog
    };
}
export function createBlogFailed() {
    return {
        type: CREATE_BLOG_FAILED
    }
}

export function logout(userId) {
    const url = "rest/user/logout/"+userId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
        fetch(url, {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",                  
                "Authorization": authCode
            }
        })
        .then(function(response) {
            if (response.status >= 200 && response.status <= 300) {
                return response.json();
            }
        }).then((user) => store.dispatch(logoutSuccessful(user)));
}

export function loginUser(credentials) {
    const userId = credentials.username;
    const passwd= credentials.password;
    const authBtoa = btoa("bloggerjwtclientid:bloggerXYZ2808");
    fetch("/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": "Basic "+authBtoa,
        },
        body: "grant_type=password&username="+userId+"&password="+passwd,

      }).then((response) => {
          console.log(response);
          const jsonResponse = response.json();
        if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
          } else {
            store.dispatch(loginFailed());
          }
    }).then((tokenResource) => {
        console.log(tokenResource);
            if (tokenResource) {
                store.dispatch(loginUserSuccessful(tokenResource));
                const user = fetchUser(userId);
            }
    });
}

export function fetchBlogsFromServer() {
        fetch("/rest/blog/list")
        .then((response) => {
                return response.json();
        }).then((blogs) => store.dispatch(listAllBlogs(blogs)));
}

export function fetchBlogsForUserFromServer(userId) {
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    console.log(authCode);
    const url = '/rest/user/blogs/'+userId;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authCode
            },
        }).then((response) => {
            if (response.status == 401) {
                store.dispatch(tokenAuthenticationFailed());
            } else if (response.status >= 200 && response.status <=300) {
                return response.json();
            } else {    
                fetchBlogsFromServer();
            }
        }).then((blogs) => {
            if (blogs) {
                store.dispatch(listAllBlogs(blogs));
            }
        });
}

export function fetchBlogFromServer(blogId) {
    const url = "/rest/blog/get/"+blogId;
    fetch(url, {
        method: "get"
    })
    .then((response) => {
        if (response.status == 401) {
            store.dispatch(tokenAuthenticationFailed());
        } else if (response.status >= 200 && response.status <= 300) {
            return response.json();
        }
    }).then((blog) => store.dispatch(editBlog(blog)));
}

export function updateBlog(blog) {
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
        fetch("/rest/blog/update", {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",                  
                "Authorization": authCode
            },
            body: JSON.stringify(blog)
        }).then(function(response){
            if (response.status == 401) {
                store.dispatch(tokenAuthenticationFailed());
            } else if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                store.dispatch(editBlogFailed(blog));
            }
              // do nothing for now.
        }).then((updatedBlog)=> {if(updatedBlog) store.dispatch(blogUpdated(updatedBlog))});
}

export function createBlog(blog) {
    console.log('Actions:createBlog: blog:'+JSON.stringify(blog));
    const payload = JSON.stringify(blog);
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    fetch("/rest/blog/add", {
        method: "post",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",                  
            "Authorization": authCode
        },
        body: payload
    }).then(function(response){
        if (response.status == 401) {
            store.dispatch(tokenAuthenticationFailed());
        } else if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            store.dispatch(createBlogFailed());
        }
    }).then((blogResponse) => {
        if (blogResponse) store.dispatch(blogCreated(blogResponse))});
}


export function registerUser(user){
        fetch("/rest/user/register", {
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",                  
            },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return store.dispatch(registerUserFailed());
            }
        }).then((user) => { if (user) store.dispatch(registeredSuccessfully())});
}

export function createComment(comment, blogId) {
    console.log("Actions: Creating Comment:comment?:"+JSON.stringify(comment));
    console.log("Actions: Creating Comment:for blogId?:"+JSON.stringify(blogId));
    const url = "/rest/blog/comment/"+blogId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    fetch(url, {
        method: "post",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": authCode
        },
        body: JSON.stringify(comment)
    }).then((response) => {
        const jsonResponse = response.json();
        console.log('Actions:createComment: response.status?:'+jsonResponse.status);
        if (response.status == 401) {
            // use refresh token to get another token
            // getRefreshToken(this);
            store.dispatch(tokenAuthenticationFailed());
        } else if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
        } else {
            store.dispatch(commentAddFailed(comment));
        }
    }).then((commentResponse) => {
        console.log('Actions:createComment: dispatching commentAdded():comments'+JSON.stringify(commentResponse));
        if (commentResponse) {
            store.dispatch(commentAdded(commentResponse));
        }
    });
}

function getRefreshToken(callback_fn) {
    const refresh_token = store.getState().auth.auth.refresh_token;
    const userId = credentials.username;
    const passwd= credentials.password;
    const authBtoa = btoa("bloggerjwtclientid:bloggerXYZ2808");
    fetch("/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": "Basic "+authBtoa,
        },
        body: "grant_type=refresh_token",

        }).then((response) => {
            console.log(response);
            const jsonResponse = response.json();
        if (response.status >= 200 && response.status < 300) {
                return jsonResponse;
            } else {
                store.dispatch(tokenAuthenticationFailed());
            }
    }).then((tokenResource) => {
        console.log("new Access token from refresh_token received:"+tokenResource);
        store.dispatch(loginUserSuccessful(tokenResource));
    });
    callback_fn();
}


export function updateProfile(user, userId){
    const url = "/rest/user/update/"+userId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    fetch(url, {
        method: "post",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": authCode
        },
        body: JSON.stringify(user)
    }).then(function(response) {
        const jsonResponse = response.json();
        if (response.status == 401) {
            store.dispatch(tokenAuthenticationFailed());
        } else if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
        } else {
            store.dispatch(updateProfileFailed(user));
        }
    }).then((profileResponse) => {
        if (profileResponse) {
            store.dispatch(profileUpdated(profileResponse));
        }
    });
}

export function fetchUser(userId) {
    const url = "/rest/user/get/"+userId;
    const user = fetch(url, {
        method: "GET"
    })
    .then(function(response) {
        if (response.status >= 200 && response.status <= 300) {
            return response.json();
        } else {
            store.dispatch(retrieveUserFailed());
        }
    }).then((user) => store.dispatch(userLoggedIn(user)));
}

export function changePassword(userId, changePassword) {
    const url = "/rest/user/changePassword/"+userId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    fetch(url, {
        method: "post",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": authCode
        },
        body: JSON.stringify(changePassword)
    }).then(function(response) {
        const jsonResponse = response.json();
        if (response.status == 401) {
            store.dispatch(tokenAuthenticationFailed());
        } else if (response.status == 409) {
            store.dispatch(passwordChangeMismatch(jsonResponse));
                        // return jsonResponse;
        } else if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
        } else {
            store.dispatch(updateProfileFailed(user));
        }
    }).then((profileResponse) => {
        if (profileResponse && profileResponse.status !== 409) {
            store.dispatch(profileUpdated(profileResponse));
        }
    });
    
}

export function searchBlogs(searchCriteria) {
    const url = "rest/blog/find?searchString="+searchCriteria.searchString+"&searchBasedOn="+searchCriteria.searchBasedOn+"&blogCategory="+searchCriteria.blogCategory;
    console.log('Actions:searchBlogs:url formed?:'+JSON.stringify(url));
    fetch(url, {
        method: "get"
    }).then((response) => {
        const jsonResponse = response.json();
        if (response.status >= 200 & response.status <= 300) {
            return jsonResponse;
        } else {
            // do nothing as it did not work out
        }
    }).then((blogs) => {
        if (blogs) {
            store.dispatch(listAllBlogs(blogs));
        }
    })
}