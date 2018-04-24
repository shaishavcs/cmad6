import React, { Component } from 'react';
import BloggerHome from "./components/BloggerHome.js";
import BloggerHomeAll from "./components/BloggerHomeAll.js";
import MyBlogs from "./components/MyBlogs.js";
import BlogComponent from "./components/Blog.js";
import HeaderComponent from "./components/Header.js";
import Login from "./components/Login.js";
import ChangePassword from "./components/ChangePassword.js";
import Logout from "./components/Logout.js";
import Signup from "./components/SignUp.js";
import EditBlog from "./components/EditBlog.js";
import EditProfile from "./components/EditProfile.js";
import store from "./store/blogger_store.js";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import { fetchAllBlogsFromServer, fetchBlogsFromServer } from "./actions/Actions.js";
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import * as BloggerActions from './actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import CreateBlog from './components/CreateBlog.js';
import ViewBlog from './components/ViewBlog.js';

// const middleware = routerMiddleware(hashHistory);

class Blogger extends Component {
    constructor(props) {
        super(props);
        // alert('Blogger: constructor: props:'+JSON.stringify(props));
        // this.state = {
        //     blogs: props.blogs,
        //     user: null
        // }
    }

    componentDidMount() {
        // alert('Blogger.js:compDidMount():blogListFromServer:this.state:'+JSON.stringify(this.props));
        // store.subscribe( () => this.forceUpdate() );
        // const blogList = fetchBlogsFromServer();
        // store.dispatch(blogList);
    }

    componentWillReceiveProps(nextProps) {
        // alert('Blogger.js:componentWillReceiveProps():nextProps?:'+JSON.stringify(nextProps));
        // this.setState({
        //     initialValues: nextProps.initialValues
        // });
    }
    
    render () {
        return (
            <BrowserRouter>
                <div>
                    {/* <h1>Welcome to Blogism</h1> */}
                    <HeaderComponent component={HeaderComponent}/>
                    <Switch>
                        <Route exact path='/' component={BloggerHome} />
                        <Route exact path='/all' component={BloggerHomeAll} />
                        {/* <Route path="/blog/:id" component={ViewBlog}/> */}
                        {/* onEnter={requireAuth}> */}
                        <Route path="/blog/create" component={CreateBlog}/>
                        <Route path="/blog/view/:id" component={ViewBlog}/>
                        <Route path="/blog/modify/:id" component={props => <EditBlog {...props}/>}/>
                        <Route path="/login" component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <Route path='/editProfile' component={EditProfile}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/changePassword' component={ChangePassword}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
function requireAuth(nextState, replace) {  
    alert('requireAuth called... store.getState():'+JSON.stringify(store.getState()));
    if (!store.getState.auth || (store.getState.auth && store.getState.auth.auth && !store.getState.auth.auth.loginSuccessful)) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
                        // {/* <Route exact path='/myblogs' component={MyBlogs} /> */}
// function mapStateToProps(state) {
//     alert('Blogger:mapStateToProps:state: '+JSON.stringify(state.blogs));
//     return {
//         initialValues: state.blogs,
//     };
// }
  
  
// function mapDispatchToProps(dispatch) {
//     return {
//       actions: bindActionCreators({
//         BloggerActions,
//         push,
//       }, dispatch),
//     };
//   }
  
  
// export default connect(mapStateToProps, mapDispatchToProps)(Blogger);

export default Blogger;
{/* <Route exact path="/" component={BloggerHome} blogs={store.getState().blogs}/> */}

// const mapStateToProps = (state) => {
//     return { 
//       blogs: state.blogs
//     };
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchBlogsFromServer: () => {
//         dispatch(fetchPosts()).then((response) => {
//               !response.error ? dispatch(fetchPostsSuccess(response.json().blogs)) : dispatch(fetchPostsFailure(response.json().blogs));
//             });
//       }
//     }
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Blogger);
{/* <Route exact path="/" component={BloggerHome} render={(props) => (
    <BlogComponent {...props} store={store} />
)}/> */}


{/* <Route path='/' render={(props) => (
    <BloggerHome {...props} store={store}/>
)}/> */}
