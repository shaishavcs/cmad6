import React from 'react';
import store from '../store/blogger_store.js';
import CommentsContainer from './CommentsContainer.js';
import { NavLink } from 'react-router-dom';

class Blog extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.blog) {
            return ('');
        }
        const hrefForCollapsiblePanel = "#"+this.props.blog.id;
        const collapsiblePanelId = this.props.blog.id;
        let canEdit = false;
        let isAuthenticated = false;
        if (store.getState().auth.auth && store.getState().auth.auth.token && store.getState().auth.auth.loginSuccessful) {
            isAuthenticated = true;
        }        

        if (isAuthenticated && store.getState().user && store.getState().user.user && this.props.blog) {
            if (store.getState().user.user.userId == this.props.blog.author.userId) {
                canEdit = true;
            }
        }
        return (
            <div className='row'>
            {this.props.blog ?
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-10">
                            <p>By {this.props.blog.author.userId} Last Updated on {this.props.blog.modifiedDate} Category: {this.props.blog.blogCategory.blogCategoryType}</p>
                        </div>
                        <div className="col-lg-1">
                            <NavLink to={`/blog/view/${ this.props.blog.id }`} blog={this.props.blog}><button className="btn-xs btn-info">View</button></NavLink>
                        </div>
                        {canEdit ?
                            <div className="col-lg-1">
                                <NavLink to={`/blog/modify/${ this.props.blog.id }`} blog={this.props.blog}><button className="btn-xs btn-warning">Edit</button></NavLink>
                            </div>
                        :
                            <div className="col-lg-1">
                                <NavLink to={`/blog/modify/${ this.props.blog.id }`} blog={this.props.blog}><button className="btn-xs btn-warning" disabled={!canEdit} >Edit</button></NavLink>
                            </div>
                        }
                    </div>
                    <div className="panel-group">
                        <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                            <a data-toggle="collapse" href={hrefForCollapsiblePanel}><h4>{this.props.blog.title}<span className="caret"></span></h4></a>
                            </h4>
                        </div>
                        <div id={collapsiblePanelId} className="panel-collapse collapse">

                            <div id={this.props.blog.blogId} className="panel-body"><div id={this.props.blog.blogId} dangerouslySetInnerHTML={createMarkup(this.props.blog.blogContent)} /></div>
                            <div className="panel-footer">
                            {this.props.blog.comments ?
                                <CommentsContainer comments={this.props.blog.comments}/>
                                :
                                <h4>Be the first to Comment...</h4>
                            }
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
             : ''
            }
            </div>
        )
    };
}

function createMarkup(blogContent) {
    return {__html: blogContent};
};

export default Blog;
