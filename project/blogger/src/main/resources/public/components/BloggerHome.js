import React from 'react';
import { fetchBlogsFromServer, fetchBlogsForUserFromServer } from "../actions/Actions.js";
import Blog from './Blog.js';
import store from '../store/blogger_store.js';
import { connect } from 'react-redux';
import * as BloggerActions from '../actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
// import { NavLinkButton } from '../widgets/NavLinkButton.js';

class BloggerHome extends React.Component {
    constructor(props) {
        super(props);
        // alert('BloggerHome: props;'+JSON.stringify(props));
        this.state={

        }
    }

    componentDidMount() {
        store.subscribe( () => this.forceUpdate() );
        const currState = store.getState();
        // alert('BloggerHome; currState:'+JSON.stringify(currState));
        if (currState.user.user) {
            // alert('BloggerHome; store.calling Action.fetchBlogsForUserFromServer:userId is:'+JSON.stringify(currState.user.user.userId));
            fetchBlogsForUserFromServer(currState.user.user.userId);
            // store.dispatch(blogList);
        } else {
            // alert('BloggerHome; calling fetchAllBlogs From Server:currState:'+JSON.stringify(currState));
            fetchBlogsFromServer();
            // store.dispatch(blogList);
        }
    }
    render() {
        // alert('BloggerHome: props;'+JSON.stringify(this.props));
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
                                <option name="Sports" value="SPORTS">Sports</option>
                                <option value="Technical">Technical</option>
                                <option value="OTHER">Other</option>
                            </select>
                            </div>
                            </div>			
                        </div>
                    </div>
                </div>
                {/* style={{backgroundColor: 'lightblue'}} */}
                <div className="container-fluid panel" >
                    <div className="row">
                        <div id="addBlogDivId">
                            <div className="col-lg-offset-1 col-lg-4">
                                <h4> Share your thoughts and experiences... </h4>
                                </div>
                                <div className="col-lg-2" >
                                    <NavLink to={`/blog/create`} ><button className="btn-sm btn-primary" id="createBlogBtn">Create Blog Now !</button></NavLink>

                                    {/* <button className="btn-sm btn-primary" id="createBlogBtn" onClick={()=> {this.props.history.replace('/blog/create')}}>
                                        Create Blog Now!
                                    </button> */}
                                    {/* <NavLinkButton /> */}
                                {/* <button className="btn btn-success" as={NavLink} to={`/blog/create`}  style={{backgroundColor: 'dodgerblue'}}>Create a Blog Now! </button> */}
                                {/* <NavLink to={`/blog/create`}>Create Blog</NavLink> */}
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
    // alert('Blogger:mapStateToProps:state.blogs: '+JSON.stringify(state.blogs));
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
    
