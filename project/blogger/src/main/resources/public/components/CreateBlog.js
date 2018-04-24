import React from 'react';
import store from '../store/blogger_store.js';
import { createBlog } from '../actions/Actions.js';
import LoadingView from './LoadingView.js';
import { Redirect } from 'react-router-dom';
// import { BlogEditorComponent } from "./BlogEditorComponent.js";
import SimpleMDE  from 'react-simplemde-editor';
import {Editor, EditorState} from 'draft-js';
import ReactSimpleMDE from 'react-simplemde';
// import { BlogEditorComponent } from './BlogEditorComponent.js';
import ReactMDE from 'react-mde';
import DraftRichEditor from './DraftRichEditor.js';
import DraftColorEditor from './DraftColorEditor.jsx';
import BlogEditor from './BlogEditor.js';
import MegadraftBlogEditor from './MegadraftBlogEditor.js';
import DraftEditor from './DraftEditor.js';

class CreateBlog extends React.Component {
    constructor(props) {
        super(props);
        console.log('Creating the Blog....'+JSON.stringify(props));
        const { match : {params}} = this.props;
            this.state = {
                id: params.id,
                blog: {
                    blogContent: {}, 
                    title: {}, 
                    blogCategory: {
                        blogCategoryType: {}
                    }, 
                    author: {},
                    likes: [],
                    createdDate: {},
                    comments: [],
                    modifiedDate: {}
                },
                editorState: EditorState.createEmpty()
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        
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
    handleSubmit(blogContent) {
        // console.log('Submit Blog: raw content of BlogEditor:?:'+JSON.stringify(blogContent));
        // console.log('Submitting Blog create request....state.blog?::: '+JSON.stringify(this.state.blog));
        const creationDate = new Date();
        let blog = this.state.blog;
        blog.createdDate = creationDate.getTime();
        blog.modifiedDate = creationDate.getTime();
        console.log('Submitting Blog create request....state.blog?::: '+JSON.stringify(blog));
        createBlog(blog);
    }
    onDraftSubmit() {
        // do nothing basically
    }
    render () {
        console.log('store.getState():'+JSON.stringify(store.getState()));
        let errorToDisplay = '<h6 style={{\'color\': \'red\'}}>{errorToDisplay}</h6>';
        let isThereError = false;
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            console.log('CreateBlog: checking auth.auth.loginSuccessful...');
            if (store.getState().auth.auth.loginSuccessful === false) {
                console.log('CreateBlog: login failed... redirescting to login...');
                return (<Redirect to='/login'/>)
            }
        } else if ((store.getState().user.user === undefined && store.getState().auth.auth === undefined ) || store.getState().auth.auth.loginSuccessful === false) {
            return (<Redirect to='/login'/>)
        }

        if (store.getState().blogs.blogCreated && store.getState().blogs.blogCreated == true) {
            return (<Redirect to={`/blog/view/${ store.getState().blogs.blog.id }`} blog={store.getState().blogs.blog} />)
        } else if (store.getState().blogs.blogCreated && store.getState().blogs.blogCreated == false) {
            errorToDisplay = '<h6 style={{\'color\': \'red\'}}>Unable to Create Blog. Report issue to the <a href=mailto:ssabapar@cisco.com> site creater</a></h6>';
            isThereError = true;
        }
        // const hrefForCollapsiblePanel = "#"+this.props.blog.id;
        // const collapsiblePanelId = this.props.blog.id;
        console.log('createBlog: render: isThereError?'+JSON.stringify(isThereError));
        return (
            <div className='row'>
                <form className=".form-control form-horizontal">
                    <div className="col-lg-10">
                        <div className="col-lg-offset-1 col-lg-10">
                            <h2>Create Blog</h2>
                            <hr />
                        </div>
                        {isThereError ?
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 ">
                                <h6></h6>
                            </div>
                            <div className="col-lg-6 ">
                                <h6 style={{'color': 'red'}}>Unable to Create Blog. Report issue to the <a href='mailto:ssabapar@cisco.com'> site creater</a></h6>
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
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <h6>Title</h6>
                            </div>
                            <div className="col-lg-6 ">
                                <input type="text" className="form-control" placeholder="Enter pertinent title of the blog" name="title" onChange={this.onChangeContent} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <h6>Category</h6>
                            </div>
                            <div className="col-lg-6">
                                <select className="form-control" id="blogCategory" name="blogCategoryType"  onChange={this.onChangeContent}>
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
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <h6>Content</h6>
                            </div>
                            <div className="col-lg-6">
                            {/* <DraftEditor onChangeContent={this.onChangeContent} /> */}
                            {/* handleSubmit={this.onDraftSubmit} */}
                            {/* <BlogEditor onChangeContent={this.onChangeContent} handleSubmit={this.handleSubmit} /> */}
                            {/* <MegadraftBlogEditor onContentChange={this.onChangeContent}/> */}
                            {/* <DraftRichEditor />
                            <DraftColorEditor /> */}
                                {/* <Editor editorState={this.state.editorState} onChange={this.onChangeContent} /> */}
                                {/* <SimpleMDE
                                    onChange={this.onChangeContent}
                                    // extraKeys={extraKeys}
                                /> */}
                                {/* <ReactSimpleMDE initialValue="Enter your blog here" /> */}
                                {/* <BlogEditorComponent /> */}
                                <textarea className="form-control" id="blogContent" rows="15" name="blogContent" onChange={this.onChangeContent}/>
                                {/* <EditorMDE details="" onChangeHandler={this.onChangeContent} name="blogContent" /> */}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-offset-4 col-sm-10 col-lg-2 panel">
                                <button type="button" className="btn btn-primary form-control" onClick={this.handleSubmit}>Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    };
}  

function createMarkup(blogContent) {
    return {__html: blogContent};
};

const EditorMDE = ({ details, onChangeHandler, name }) => (
    <div>
      <ReactMDE
        value={details}
        onChange={onChangeHandler}
        name={name}
      />
    </div>
  );
export default CreateBlog;
