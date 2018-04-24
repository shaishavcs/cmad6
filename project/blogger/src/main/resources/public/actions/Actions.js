import axios from 'axios';
import { BLOG_UPDATED, PASSWORD_CHANGE_MISMATCH, PROFILE_UPDATE_FAILED, PROFILE_UPDATED, COMMENT_ADDED_SUCCESSFULLY, COMMENT_CREATION_FAILED, USER_REGISTERED_SUCCESSFULLY, USER_REGISTRATION_FAILED, USER_LOGGED_IN, PASSWORD_CHANGE_SUCCESSFUL, PASSWORD_CHANGE_FAILED, LOGIN_SUCCESSFUL, LOGIN_FAILED, BLOG_CREATED, CREATE_BLOG_FAILED, UPDATE_BLOG, BLOG_LIST, LIST_ALL_BLOGS, EDIT_BLOG, COMMENTS_LIST, ADD_LIKE, LOGOUT_SUCCESSFUL, EDIT_BLOG_FAILED, TOKEN_AUTHENTICATION_FAILED } from "./ActionConstants";
// import { normalize, schema } from 'normalizr';
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
    alert('COMMENT_CREATION_FAILED: comments:'+JSON.stringify(comment));
    return {
        type: COMMENT_CREATION_FAILED,
        comment: comment
    }
}
export function commentAdded(comment) {
    alert('COMMENT_ADDED_SUCCESSFULLY: comments:'+comment);
    return {
        type: COMMENT_ADDED_SUCCESSFULLY,
        comment: comment
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
    // alert('Actions:login failed...');
    return {
        type: LOGIN_FAILED
    };
}

export function loginUserSuccessful(token) {
    // alert('Actions:loginUserSuccessful:'+JSON.stringify(token));
    return {
        type: LOGIN_SUCCESSFUL,
        token: token
    };
}

export function listAllBlogs(blogs) {
    // alert('ACtions:listOfBlogs:'+JSON.stringify(blogs));
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
    // alert('editBlog Action dispatching:blog:'+JSON.stringify(blog));
    return {
        type: EDIT_BLOG,
        blog: blog
    };
}

export function editBlogFailed(blog) {
    // alert('Actions:login failed...');
    return {
        type: EDIT_BLOG_FAILED,
        blog: blog
    };
}
export function blogCreated(blog) {
    // alert('addBlog Action dispatching:blog:'+JSON.stringify(blog));
    return {
        type: BLOG_CREATED,
        blog: blog
    };
}
export function blogUpdated(blog) {
    // alert('addBlog Action dispatching:blog:'+JSON.stringify(blog));
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
    console.log('Actions:Logout user:'+JSON.stringify(userId));
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

export function loginUserCombinedCall(credentials) {
    const fetchToken = loginUserGetToken(credentials);
    const fetchLoggedInUser = fetchUser(credentials.username);
    return Promise.all(fetchToken, fetchLoggedInUser)
    .then(values => {
        // alert("loginUser:values?:"+JSON.stringify(values));
        store.dispatch(loginUserSuccessful(values))
    });
}

// fetch("http://localhost:8082/oauth/token", { body: "client_id=bloggerjwtclientid&client_secret=bloggerXYZ2808&grant_type=password&scope=read write&username=sanjubhai&password=string", headers: { "Content-Type": "application/x-www-form-urlencoded" }, method: "POST" })
// credentials: 'same-origin'
export function loginUser(credentials) {
    const userId = credentials.username;
    const passwd= credentials.password;
    const authBtoa = btoa("bloggerjwtclientid:bloggerXYZ2808");
    // alert('loginUser:authBtoa:'+authBtoa);
    fetch("http://localhost:8082/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": "Basic "+authBtoa,
        },
        body: "grant_type=password&username="+userId+"&password="+passwd,

      }).then((response) => {
          console.log(response);
          const jsonResponse = response.json();
        //   alert("loginUser: response?:"+JSON.stringify(jsonResponse));
        if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
          } else {
            store.dispatch(loginFailed());
          }
    }).then((tokenResource) => {
        console.log(tokenResource);
        // if (tokenResource.status >= 200 && tokenResource.status < 300) {
            if (tokenResource) {
                store.dispatch(loginUserSuccessful(tokenResource));
                const user = fetchUser(userId);
            }
        // }
        // alert('fetched User is:'+JSON.stringify(user));
    });
}
// headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "authorization": "Basic "+authBtoa,
//   },

export function loginUserNotWorking(credentials) {
    fetch("oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {
            "grant_type": "password",
            "username": credentials.username,
            "password": credentials.password,
            "client_id": "bloggerjwtclientid",
            "client_secret": "bloggerXYZ2808"
        }
      }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            store.dispatch(loginFailed());
          }
    }).then((userResource) => {
        console.log(userResource);
        store.dispatch(loginUserSuccessful(userResource));
    });
}

export function loginUserWorkingWrongToken(credentials) {
    fetch("/rest/user/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",                  
          }, 
        body: JSON.stringify(credentials)
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
            // store.dispatch(loginUserSuccessful(response.json()));
          } else {
            // const error = new Error(response.statusText);
            // error.response = response;
            store.dispatch(loginFailed());
            // throw error;
          }
             // const userResource = response.json();
        // alert('login:response:'+JSON.stringify(userResource));
        // return response.json();
    }).then((userResource) => {
        console.log(userResource);
        store.dispatch(loginUserSuccessful(userResource));
        // return userResource;
    });        
}
export function fetchBlogsFromServer() {
    // alert('Calling fetchAllBlogs....')
    // return (dispatch) => {
        fetch("/rest/blog/list")
        .then((response) => {
                return response.json();
        }).then((blogs) => store.dispatch(listAllBlogs(blogs)));
    // };
}

export function fetchBlogsForUserFromServer(userId) {
    // alert('Actions..fetching blogs from server.user:'+JSON.stringify(userId));
    // alert('Token to be passed:'+JSON.stringify(store.getState().auth.auth.token));
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    // alert('Auth Code being passed:'+JSON.stringify(authCode));
    console.log(authCode);
    const url = '/rest/user/blogs/'+userId;
    // return (dispatch) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authCode
                // "Access-Control-Allow-Origin": "*",
                // "Content-Type": "application/x-www-form-urlencoded",
                // "Accept": "application/json",                  
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
            // alert("Actions:fetchBlogsForUserFromServer():blogs for user:"+JSON.stringify(blogs));
            if (blogs) {
                store.dispatch(listAllBlogs(blogs));
            }
        });
    // };
}

export function fetchBlogFromServer(blogId) {
    const url = "/rest/blog/get/"+blogId;
    // alert('Actions:fetchBlogFromServer being called.url to call:'+url+ ' and token is?'+JSON.stringify(store.getState().auth.auth.token));
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    fetch(url, {
        method: "get"
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Content-Type": "application/json",
        //     "Accept": "application/json",                  
        //     "Authorization": authCode
        // }
    })
    .then((response) => {
        // alert('Response from edit/blog is:'+JSON.stringify(response));
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
    // return (dispatch) => {
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
    // };
}

export function createBlog(blog) {
    // alert('Actions: CreateBlog: blog:'+JSON.stringify(blog));
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
    // alert("Actions: registerUser:user?"+JSON.stringify(user));
    // return (dispatch) => {
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
            // do nothing for now.
        // });
    // };
}

export function createComment(comment, blogId) {
    console.log("Actions: Creating Comment:comment?:"+JSON.stringify(comment));
    console.log("Actions: Creating Comment:for blogId?:"+JSON.stringify(blogId));
    const url = "/rest/blog/comment/"+blogId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    console.log("Actions: createComment: calling url:"+JSON.stringify(url));
    console.log("Actions: createComment: authCode to use:"+authCode);
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
    // .then((comment) => store.dispatch(commentAdded(comment)));
    // };
}

function getRefreshToken(callback_fn) {
    const refresh_token = store.getState().auth.auth.refresh_token;
    const userId = credentials.username;
    const passwd= credentials.password;
    const authBtoa = btoa("bloggerjwtclientid:bloggerXYZ2808");
    // alert('loginUser:authBtoa:'+authBtoa);
    fetch("http://localhost:8082/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": "Basic "+authBtoa,
        },
        body: "grant_type=refresh_token",

        }).then((response) => {
            console.log(response);
            const jsonResponse = response.json();
        //   alert("loginUser: response?:"+JSON.stringify(jsonResponse));
        if (response.status >= 200 && response.status < 300) {
                return jsonResponse;
            } else {
                store.dispatch(tokenAuthenticationFailed());
            }
    }).then((tokenResource) => {
        console.log("new Access token from refresh_token received:"+tokenResource);
        // if (tokenResource.status >= 200 && tokenResource.status < 300) {
            store.dispatch(loginUserSuccessful(tokenResource));
        // }
        // alert('fetched User is:'+JSON.stringify(user));
    });
    callback_fn();
}


export function updateProfile(user, userId){
    const url = "/rest/user/update/"+userId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    console.log("Actions: updateProfile: calling url:"+JSON.stringify(url));
    console.log("Actions: updateProfile: calling user:"+JSON.stringify(user));
    console.log("Actions: updateProfile: authCode to use:"+authCode);
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
        console.log('Actions:updateProfile: dispatching profileUpdated():profileResponse'+JSON.stringify(profileResponse));
        if (profileResponse) {
            store.dispatch(profileUpdated(profileResponse));
        }
    });
}

export function fetchUser(userId) {
    // alert('fetchUser:tokenResource:'+JSON.stringify(userId));
    const url = "/rest/user/get/"+userId;
    const user = fetch(url, {
        method: "POST",
        body: {
            "token": "AccessToken can be here..."
        }
    })
    .then(function(response) {
        // alert('fetchUser: response is?'+JSON.stringify(user));
        return response.json();
    }).then((user) => store.dispatch(userLoggedIn(user)));
    // alert('fetchUser: user is?'+JSON.stringify(user));
    // return user;
}

export function changePassword(userId, changePassword) {
    const url = "/rest/user/changePassword/"+userId;
    const token = store.getState().auth.auth.token;
    const authCode = 'Bearer '+token;
    console.log("Actions: changePassword: calling url:"+JSON.stringify(url));
    console.log("Actions: changePassword: calling changePassword:"+JSON.stringify(changePassword));
    console.log("Actions: changePassword: authCode to use:"+authCode);
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
            return jsonResponse;
        } else if (response.status >= 200 && response.status < 300) {
            return jsonResponse;
        } else {
            store.dispatch(updateProfileFailed(user));
        }
    }).then((profileResponse) => {
        console.log('Actions:changePassword: dispatching profileUpdated():profileResponse.status?'+JSON.stringify(profileResponse.status));
        if (profileResponse && profileResponse.status == 409) {
            store.dispatch(passwordChangeMismatch(jsonResponse));
        } else if (profileResponse) {
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