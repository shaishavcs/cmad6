import React from 'react';
import store from '../store/blogger_store.js';
import CommentsContainer from './CommentsContainer.js';
import { fetchBlogFromServer, updateBlog } from '../actions/Actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import LoadingView from './LoadingView.js';
import { Redirect } from 'react-router-dom';
import CollapsiblePreview from './CollapsiblePreview.js';

class EditBlog extends React.Component {
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
    }

    componentDidMount() {
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
        blog['modifiedDate'] = new Date().getTime();
        return this.setState({
            blog: blog,
        });
    }
    handleSubmit() {
        updateBlog(this.state.blog);
    }
    render () {
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            if (store.getState().auth.auth.loginSuccessful === false) {
                return (<Redirect to='/login'/>)
            }
        } else if ((store.getState().user.user === undefined && store.getState().auth.auth === undefined ) || store.getState().auth.auth.loginSuccessful === false) {
            return (<Redirect to='/login'/>)
        }
        let isThereError = false;
        if (store.getState().blogs.blogUpdated) {
            return (<Redirect to={`/blog/view/${ store.getState().blogs.blog.id }`} blog={store.getState().blogs.blog} />)
        } else if (store.getState().blogs.blogUpdated && store.getState().blogs.blogUpdated == false) {
            errorToDisplay = '<h6 style={{\'color\': \'red\'}}>Unable to Edit the Blog. Report issue to the <a href=mailto:ssabapar@cisco.com> site creater</a></h6>';
            isThereError = true;
        }

        if (this.props.blog) {
                return (
                <div className='row'>
                    <form className=".form-control form-horizontal">
                        <div className="col-lg-12">
                            <div className="col-lg-offset-1 col-lg-10">
                                <h2>Edit Blog</h2>
                                <hr />
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-1 col-lg-12 panel">
                                    <h6>Last modified on {new Date(this.state.blog.modifiedDate).toUTCString()}. Created on {new Date(this.state.blog.createdDate).toUTCString()}</h6>
                                </div>
                            </div>
                            {isThereError ?
                            <div className="row">
                                <div className="col-lg-offset-2 col-lg-2 ">
                                    <h6></h6>
                                </div>
                                <div className="col-lg-6 ">
                                    <h6 style={{'color': 'red'}}>Unable to Edit Blog. Report issue to the <a href='mailto:ssabapar@cisco.com'> site creater</a></h6>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col-lg-offset-2 col-lg-2 ">
                                    <h6></h6>
                                </div>
                                <div className="col-lg-6 ">
                                    <h6 style={{'color': 'red'}}></h6>
                                </div>
                            </div>
                            }                                   
                            <div className="row">
                                <div className="col-lg-offset-1 col-lg-1 panel">
                                    <h6>Title</h6>
                                </div>
                                <div className="col-lg-5 ">
                                    <input type="text" className="form-control" value={this.props.blog.title} name="title" onChange={this.onChangeContent} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-1 col-lg-1 panel">
                                    <h6>Category</h6>
                                </div>
                                <div className="col-lg-5">
                                    <select className="form-control" id="blogCategory" name="blogCategoryType" value={this.props.blog.blogCategory.blogCategoryType} onChange={this.onChangeContent}>
                                        {/* <option name="All" value="ALL">All</option> */}
                                        <option name="Personal Care" value="PERSONAL_CARE">Personal Care</option>
                                        <option name="Life Science" value="LIFE_SCIENCES">Life Science</option>
                                        <option name="Travel" value="TRAVEL">Travel</option>
                                        <option name="Food" value="FOOD">Food</option>
                                        <option name="Political" value="POLITICAL">Political</option>
                                        <option name="Sports" value="SPORTS">Sports</option>
                                        <option name="Technical" value="TECHNICAL">Technical</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-offset-1 col-lg-1 panel">
                                    <h6>Content</h6>
                                </div>
                                <div className="col-lg-5">
                                    <textarea className="form-control" id="blogContent" rows="15" name="blogContent" value={this.props.blog.blogContent} onChange={this.onChangeContent}/>
                                </div>
                                <div className="col-lg-5">
                                    <CollapsiblePreview blogId={this.state.blog.id} blogContent={this.state.blog.blogContent}/>
                                </div>
                            </div>
                            <div className="row">
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-offset-4 col-sm-10 col-lg-2 panel">
                                    <button className="btn btn-info form-control" id="cancelBtnId" onClick={()=> {this.props.history.replace('/')}}>Cancel</button>
                                </div>
                                <div className="col-sm-10 col-lg-2 panel">
                                    <button type="button" className="btn btn-primary form-control" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
