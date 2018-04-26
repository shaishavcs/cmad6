import React from 'react';
import { fetchBlogsFromServer, fetchBlogsForUserFromServer, searchBlogs } from "../actions/Actions.js";
import Blog from './Blog.js';
import store from '../store/blogger_store.js';
import { connect } from 'react-redux';
import * as BloggerActions from '../actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

class BloggerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {
                searchBasedOn: "Title",
                searchString: {},
                blogCategory: "All"
            }
        }
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(event) {
        this.state.searchCriteria[event.target.name] = event.target.value;
    }

    submit() {
        // get the blogs from server based on search criteria
        searchBlogs(this.state.searchCriteria);
    }

    componentDidMount() {
        // store.subscribe( () => this.forceUpdate() );
        const currState = store.getState();
        if (currState.user.user) {
            fetchBlogsForUserFromServer(currState.user.user.userId);
        } else {
            fetchBlogsFromServer();
        }
    }
    render() {
        return (
			<div className="col-xs-12 col-lg-12">

                <div className="container-fluid panel">
                    <div className="row">
                        <div className="row" >
                            <div className="col-xs-8 padding-left-blogger" >
                            <div className="col-xs-11 zero-padding">
                            <input type="text" className="form-control" name="searchString" placeholder="Search Blog.." id="searchContentId" onChange={this.onChange} />
                            </div>
                            <div className="col-xs-1 zero-padding">
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" id="searchBtn" onClick={this.submit}>
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
                            <select className="form-control" id="searchTypeId" name="searchBasedOn" onChange={this.onChange}>
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
                            <select className="form-control" name="blogCategory" onChange={this.onChange}>
                                <option value="All">All</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Life Science">Life Science</option>
                                <option value="Travel">Travel</option>
                                <option value="Food">Food</option>
                                <option value="Political">Political</option>
                                <option name="Sports" value="SPORTS">Sports</option>
                                <option value="Technical">Technical</option>
                                <option value="OTHER">Other</option>
                            </select>
                            </div>
                            </div>			
                        </div>
                    </div>
                </div>
                <div className="container-fluid panel" >
                    <div className="row">
                        <div id="addBlogDivId">
                            <div className="col-lg-offset-1 col-lg-4">
                                <h4> Share your thoughts and experiences... </h4>
                                </div>
                                <div className="col-lg-2" >
                                    <NavLink to={`/blog/create`} ><button className="btn-sm btn-primary" id="createBlogBtn">Create Blog Now !</button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid panel">
                {store.getState().user.user ?
                <h4><small>MY POSTS</small></h4>
                : 
                <h4><small>RECENT POSTS</small></h4>
                }                
                    <div id="blogListDivId">
                        {this.props.blogs ?
                            <div className="panel">
                                {Object.keys(this.props.blogs).map((blog, key) => (
                                    <Blog key={key} blog={this.props.blogs[key]} />
                                ))}
                            </div>
                            : 
                            <div className="panel">
                                <label>No blogs to list</label>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return state.blogs;
    
}
    
    
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchBlogsFromServer, fetchBlogsForUserFromServer,
            push,
        }, dispatch),
    };
}
      
      
export default connect(mapStateToProps, mapDispatchToProps)(BloggerHome);
    
