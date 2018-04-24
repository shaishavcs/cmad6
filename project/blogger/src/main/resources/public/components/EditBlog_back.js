import React from 'react';
import store from '../store/blogger_store.js';
import CommentsContainer from './CommentsContainer.js';
import { fetchBlogFromServer, updateBlog } from '../actions/Actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import LoadingView from './LoadingView.js';
import {Redirect} from 'react-router-dom';

class EditBlog_back extends React.Component {
    constructor(props) {
        super(props);
        console.log('Editing the Blog....'+JSON.stringify(props));
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }

    componentDidMount() {
        // const { match : {params}} = this.props;
        alert('EditBlog_back:this.props'+JSON.stringify(this.props));
        alert('EditBlog_back:params.id'+JSON.stringify(this.state));
        if(this.props.blog === undefined && store.getState().auth.auth && store.getState().auth.auth.loginSuccessful) {
            fetchBlogFromServer(this.state.id);
        }
        
    }
    onChangeContent(event) {
        const field = event.target.name;
        const blog = this.state.blog;
        if (field === "blogCategoryType") {
            blog.blogCategory[field] = event.target.value;
        } else {
            blog[field] = event.target.value;
        }
        return this.setState({
            blog: blog,
        });
    }
    handleSubmit() {
        console.log('Submitting Blog update request....state.blog?::: '+JSON.stringify(this.state.blog));
        updateBlog(this.state.blog);
    }
    render () {
        console.log('store.getState():'+JSON.stringify(store.getState()));
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            console.log('EditBlog_back: checking auth.auth.loginSuccessful...');
            if (store.getState().auth.auth.loginSuccessful === false) {
                console.log('EditBlog_back: login failed... redirescting to login...');
                return (<Redirect to='/login'/>)
            }
        } else if ((store.getState().user.user === undefined && store.getState().auth.auth === undefined ) || store.getState().auth.auth.loginSuccessful === false) {
            return (<Redirect to='/login'/>)
        }

        if (this.props.blog) {
            return (
                <div className='row'>
                {this.props.blog ?
                    <form className=".form-control form-horizontal">
                        <div className="col-lg-10">
                            <div className="col-lg-offset-1 col-lg-10">
                                <h2>Create Blog</h2>
                                <hr />
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-2 col-lg-2 panel">
                                    <h6>Title</h6>
                                </div>
                                <div className="col-lg-10 panel">
                                    <input type="text" name="title" value={this.props.blog.title} onChange={this.onChangeContent}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-2 col-lg-2 panel">
                                    <h6>Category</h6>
                                </div>
                                <div className="col-lg-10 panel">
                                    <select className="form-control" id="blogCategory" name="blogCategoryType"  value={this.props.blog.blogCategory.blogCategoryType} onChange={this.onChangeContent}>
                                        <option name="All" value="ALL">All</option>
                                        <option name="Personal Care" value="PERSONAL_CARE">Personal Care</option>
                                        <option name="Life Science" value="LIFE_SCIENCES">Life Science</option>
                                        <option name="Travel" value="TRAVEL">Travel</option>
                                        <option name="Food" value="FOOD">Food</option>
                                        <option name="Political" value="POLITICAL">Political</option>
                                        <option name="Technical" value="TECHNICAL">Technical</option>
                                    </select>
                                    {/* <select name="blogCategory" value={this.props.blog.blogCategory}>
                                        <option value="All" name="All">All</option>
                                        <option value="Personal Care" name="Personal Care">Personal Care</option>
                                        <option value="Life Science" name="Life Science">Life Science</option>
                                        <option value="Travel" name="Travel">Travel</option>
                                        <option value="Food" name="Food">Food</option>
                                        <option value="Political" name="Political">Political</option>
                                        <option value="Technical" name="Technical">Technical</option>
                                    </select> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-2 col-lg-2 panel">
                                    <h6>Content</h6>
                                </div>
                                <div className="col-lg-10 panel">
                                    <div id={this.props.blog.blogId} className="panel-body">
                                        <textarea className="form-control" id="blogContent" rows="15" name="blogContent" onChange={this.onChangeContent}/>
                                        {/* <div id={this.props.blog.blogId} dangerouslySetInnerHTML={createMarkup(this.props.blog.blogContent)} /> */}
                                    </div>
                                    {/* <input type="text" name="blogContent" value={createMarkup(this.props.blog.blogContent)} onChange={this.onChangeContent}/> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
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
    alert('EditBlog_back:mapStateToProps:state.blog: '+JSON.stringify(state));
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog_back);
