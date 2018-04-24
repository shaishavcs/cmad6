import React from 'react';
import { fetchBlogsForUserFromServer } from "../actions/Actions.js";
import Blog from './Blog.js';
import store from '../store/blogger_store.js';
import { connect } from 'react-redux';
import * as BloggerActions from '../actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

class MyBlogs extends React.Component {
    constructor(props) {
        super(props);
        alert('MyBlogs:Constructor:props:'+JSON.stringify(props));
        // this.state={
        //     blogs: props.blogs
        // }
    }

    componentDidMount() {
        // store.subscribe( () => this.forceUpdate() );
        const currState = store.getState();
        alert('MyBlogs; store.getState():'+JSON.stringify(currState.user));
        alert('MyBlogs; this.props.initialValues:'+JSON.stringify(this.props.initialValues));
        // if (this.props.initialValues) {
        //     return;
        // } else 
        if (currState.user.user) {
            alert('MyBlogs; store.calling Action.fetchBlogsForUserFromServer:userId is:'+JSON.stringify(currState.user.user.userId));
            const blogList = fetchBlogsForUserFromServer(currState.user.user.userId);
            store.dispatch(blogList);
        }

    }
    render() {
        alert('MyBlogs:render:this.props.initialValues:'+JSON.stringify(this.props.initialValues));
        // const blogList = this.state.blogs;
        // const listOfBlogs = blogList[0];
        // alert('BloggerHome: listOfBlogs?:'+JSON.stringify(listOfBlogs));
        return (
			<div className="col-xs-12 col-lg-12">

                <div className="container-fluid panel">
                    <div className="row">
                        <div className="row" >
                            <div className="col-xs-8 padding-left-blogger" >
                            <div className="col-xs-11 zero-padding">
                            <input type="text" className="form-control" placeholder="Search Blog.." id="searchContentId" />
                            </div>
                            <div className="col-xs-1 zero-padding">
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" id="searchBtn">
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                            </div>
                            </div>
                            <div className="col-xs-2 zero-padding">
                            <div className="col-xs-2 search-type-padding" >
                            <label className="search-bar-label">for</label>
                            </div>
                            <div className="col-xs-10 blogger-padding-left-right-ten">
                            <select className="form-control" id="searchTypeId">
                                <option value="Title">Title</option>
                                <option value="Author">Author</option>
                                <option value="Content">Content</option>
                            </select>
                            </div>
                            </div>			
                            <div className="col-xs-2 zero-padding">
                            <div className="col-xs-2 padding-left-blogger">
                            <label className="search-bar-label">in</label>
                            </div>
                            <div className="col-xs-10 padding-left-right-blogger">
                            <select className="form-control">
                                <option value="All">All</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Life Science">Life Science</option>
                                <option value="Travel">Travel</option>
                                <option value="Food">Food</option>
                                <option value="Political">Political</option>
                                <option value="Technical">Technical</option>
                            </select>
                            </div>
                            </div>			
                        </div>
                    </div>
                </div>

                <div className="container-fluid panel">
                <h4><small>POSTS</small></h4>
                    <div id="blogListDivId">
                        {this.props.initialValues ?
                            <div className="panel">
                                {Object.keys(this.props.initialValues).map((blog, key) => (
                                    <Blog key={key} blog={this.props.initialValues[key]} />
                                ))}
                            </div>
                            : 
                            <div className="panel">
                                <label>No blogs to list. Create Now!</label>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

     function mapStateToProps(state) {
        alert('MyBlogs:mapStateToProps:state.blogs: '+JSON.stringify(state.blogs));
        return {
            initialValues: state.blogs,
        };
    }
          
    function mapDispatchToProps(dispatch) {
        return {
            actions: bindActionCreators({
                BloggerActions,
                push,
            }, dispatch),
        };
    }
      
    
    export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs);
    // export default MyBlogs;
    