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
import {HashRouter, Route, Link, Switch} from 'react-router-dom';
import { fetchAllBlogsFromServer, fetchBlogsFromServer } from "./actions/Actions.js";
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import * as BloggerActions from './actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import CreateBlog from './components/CreateBlog.js';
import ViewBlog from './components/ViewBlog.js';

class Blogger extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <HashRouter>
                <div>
                    <HeaderComponent component={HeaderComponent}/>
                    <Switch>
                        <Route exact path='/' component={BloggerHome} />
                        <Route exact path='/all' component={BloggerHomeAll} />
                        <Route path="/blog/create" component={CreateBlog}/>
                        <Route path="/blog/view/:id" component={ViewBlog}/>
                        <Route path="/blog/modify/:id" component={props => <EditBlog {...props}/>}/>
                        <Route path="/login" component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <Route path='/editProfile' component={EditProfile}/>
                        <Route path='/logout' component={BloggerHome}/>
                        <Route path='/changePassword' component={ChangePassword}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default Blogger;
