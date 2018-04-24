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
        // console.log("CommentCreating:"+event.target.value);
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
        // console.log('Submitting Comment update request....state.comment?::: '+JSON.stringify(this.state.comment));
        const creationDate = new Date(),
        date = creationDate.getFullYear() + '-' + (creationDate.getMonth() + 1) + '-' + creationDate.getDate();
        let comment = this.state.comment;
        comment.postedDate = creationDate;
        console.log('Submitting Comment update request....state.comment?::: '+JSON.stringify(comment));
        // if (this.state.edit) {
        //     editComment(comment);
        // } else {
        createComment(comment, this.state.blog.id);
        // }
    }

    // postCommentClickHandler() {
    //     return this.setState({
    //         comments: this.state.comments,
    //         blog: this.state.blog,
    //         showCreateComment: !showCreateComment 
    //     });
    // }

    render () {
        let userLoggedIn = true;
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            console.log('EditBlog: checking auth.auth.loginSuccessful...');
            if (store.getState().auth.auth.loginSuccessful === false) {
                console.log('EditBlog: login failed... redirescting to login...');
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
                            {/* <NavLink to={`/blog/modify/${ this.props.blog.id }`} blog={undefined}><button className="btn btn-primary">Post a Comment</button></NavLink> */}
                            {/* <button className="btn-xs btn-success" onClick={() => this.setState({ comment: this.state.comment, comments:this.state.comments, blog:this.state.blog,showCreateComment: !this.state.showCreateComment })} >Post a Comment</button> */}
                            <h4>Post a Comment</h4>

                        </div>
                        :
                        <div className="col-lg-2">
                            {/* <NavLink to={`/blog/modify/${ this.props.blog.id }`} blog={undefined}><button className="btn btn-primary">Post a Comment</button></NavLink> */}
                            {/* <button className="btn-xs btn-success" onClick={() => this.setState({ comment: this.state.comment, comments:this.state.comments, blog:this.state.blog,showCreateComment: !this.state.showCreateComment })} >Post a Comment</button> */}
                            {/* <h4>Post a Comment</h4><NavLink to='/login'>Login Now</NavLink> */}
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
                    <h4 style={{backgroundColor: 'lightgrey'}}>Comments {Object.keys(this.props.comments).length}</h4>
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
