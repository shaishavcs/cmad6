import React from 'react';
import store from '../store/blogger_store.js';
import Comment from './Comment.js';
import DraftEditor from './DraftEditor.js';
import { createComment } from '../actions/Actions.js';
import { NavLink } from 'react-router-dom';

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments,
            comment: {
                commentContent: {},
                blog: this.props.blog,
                commentedBy: {},
                postedDate: {},
                // id: {}
            },
            blog: this.props.blog,
            showCreateComment: false
        }
        this.onChangeContent = this.onChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeContent(event) {
        const field = event.target.name;
        const comment = this.state.comment;
        comment[field] = event.target.value;
        return this.setState({
            comment: comment,
            comments: this.state.comments,
            blog: this.state.blog,
            showCreateComment: this.state.showCreateComment 
        });
    }
    handleSubmit() {
        const creationDate = new Date(),
        date = creationDate.getFullYear() + '-' + (creationDate.getMonth() + 1) + '-' + creationDate.getDate();
        let comment = this.state.comment;
        comment.postedDate = creationDate;
        createComment(comment, this.state.blog.id);
    }

    render () {
        let userLoggedIn = true;
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            if (store.getState().auth.auth.loginSuccessful === false) {
                userLoggedIn = false;
            }
        } else if ((store.getState().user.user === undefined && store.getState().auth.auth === undefined ) || store.getState().auth.auth.loginSuccessful === false) {
            userLoggedIn = false;
        }
        
        return (
            <div className='row'>
                {this.state.blog ?
                <div>
                    <div className="row">
                        <hr />
                        {userLoggedIn ?
                        <div className="col-lg-2">
                            <h4>Post a Comment</h4>

                        </div>
                        :
                        <div className="col-lg-2">
                            <NavLink to='/login'><button className="btn-sm btn-success" >Login to Post a Comment</button></NavLink>
                        </div>
                        
                        }
                    </div>
                    <div className="panel" >
                        {userLoggedIn ?
                            <div className="col-lg-12 panel" id="createCommentDivId" style={{backgroundColor: 'lightblue'}}>
                                <DraftEditor onChangeContent={this.onChangeContent} handleSubmit={this.handleSubmit} />
                            </div>
                            : '' 
                        } 
                    </div>
                </div>
                : ''
                }
                <div className="row" />
                <div className="panel">
                    <h5 style={{backgroundColor: 'lightgrey'}}>Comments {Object.keys(this.props.comments).length}</h5>
                </div>
            {Object.keys(this.props.comments).length > 0 ?
                <div className="panel">
                    {Object.keys(this.props.comments).map((blog, key) => (
                        <Comment key={key} comment={this.props.comments[key]} />
                    ))}
                </div>
                :
                <h6>Be the First to Comment Now</h6>
                }
            </div>
        )
    };
}

export default CommentsContainer;
