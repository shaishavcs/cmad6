import React from 'react';
import store from '../store/blogger_store.js';
import CommentsContainer from './CommentsContainer.js';
import { fetchBlogFromServer } from '../actions/Actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import LoadingView from './LoadingView.js';

class ViewBlog extends React.Component {
    constructor(props) {
        super(props);
        const { match : {params}} = this.props;
        if (this.props.blog) {
            this.state = {
                id: params.id,
                blog: this.props.blog
            };
        } else {
            this.state = {
                id: params.id
            }
        }
    }

    componentDidMount() {
        if (!this.state.blog) {
            fetchBlogFromServer(this.state.id);
        }
    }
    render () {
    		if(this.props.blog) { 
    			console.log("ViewBlog:render:this.props.blog.comments"+JSON.stringify(this.props.blog.comments));
    		}
        if (this.props.blog) {
            return (
                <div className='row'>
                {this.props.blog ?
                        <div className="col-sm-offset-1 col-lg-10">
                            <div className="row">
                                <div className="col-lg-2 panel">
                                    <h3>{this.props.blog.title}</h3>
                                </div>
                                {/* <div className="col-lg-10 panel">
                                    <label> {this.props.blog.title} </label>
                                </div> */}
                            </div>
                            <div className="col-lg-10 row">
                                {/* <div className="col-lg-10"> */}
                            <p>By {this.props.blog.author.userId} Last Updated on {new Date(this.props.blog.modifiedDate).toUTCString()}. Created on {new Date(this.props.blog.createdDate).toUTCString()} </p>
                        {/* </div> */}
                                </div>

                            <div className="row">
                                <div className="col-lg-10 panel">
                                    <p>Category: {this.props.blog.blogCategory.blogCategoryType}</p>
                                </div>
                            </div>
                            <div className="row">
                                {/* <div className="col-lg-2 panel">
                                    <h6>Content</h6>
                                </div> */}
                                <div className="col-lg-12 panel">
                                {/* <div id={this.props.blog.blogId} className="panel-body"> */}
                                        <div id={this.props.blog.blogId} dangerouslySetInnerHTML={createMarkup(this.props.blog.blogContent)} />
                                    {/* </div> */}
                                    {/* <input readOnly type="text" name="blogContent" value={createMarkup(this.props.blog.blogContent)} /> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <button type="button" className="btn-xs btn-info" onClick={()=> {this.props.history.replace('/')}}>
                                    Return</button>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn-xs btn-primary" onClick={()=> {this.props.history.replace('/')}}>
                                    Edit</button>
                                </div>
                            </div>
                            <div className="col-sm-12 panel">
                            {this.props.blog.comments ?
                                <CommentsContainer comments={this.props.blog.comments} blog={this.props.blog}/>
                                :
                                <h4>Be the first to Comment...</h4>
                            }
                            </div>
                        </div>
                : ''
                }
                </div>
            )
        } else {
            return (<LoadingView />);
        }
    };
}

function mapStateToProps(state) {
    return state.blogs
}

      
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchBlogFromServer,
            push,
        }, dispatch),
    };
}
  

function createMarkup(blogContent) {
    return {__html: blogContent};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlog);
