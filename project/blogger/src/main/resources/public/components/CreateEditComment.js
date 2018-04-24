import React from 'react';
import store from '../store/blogger_store.js';
import { createComment } from '../actions/Actions.js';

class CreateEditComment extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.comment) {
            this.state={
                comment: props.comment,
                edit: true
            }
        } else {
            this.state={
                comment: {
                    blog: props.blog,
                    commentContent: {},
                    commentedBy: {},
                    postedDate: {}
                },
                edit: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        
    }
    onCommentChange(event) {
        const field = event.target.name;
        const comment = this.state.comment;
        comment[field] = event.target.value;
        return this.setState({
            comment: comment,
        });
    }
    handleSubmit() {
        console.log('Submitting Comment update request....state.comment?::: '+JSON.stringify(this.state.comment));
        const creationDate = new Date(),
        date = creationDate.getFullYear() + '-' + (creationDate.getMonth() + 1) + '-' + creationDate.getDate();
        let comment = this.state.comment;
        comment.createdDate = creationDate;
        comment.modifiedDate = creationDate;
        console.log('Submitting Comment update request....state.comment?::: '+JSON.stringify(comment));
        if (this.state.edit) {
            editComment(comment);
        } else {
            createComment(comment);
        }
    }

    render () {
        return (
            <div className='col-lg-12 panel'  style={{backgroundColor: 'lightblue'}}>
            {this.props.comment ?
                <div className="row panel">
                    <TextInput style={styles.textInput} onChange={this.onCommentChange}/>
                </div>
             : ''
            }
            </div>
        )
    };
}
{/* <TextInput style={styles.textInput} /> */}

const commentedByStyle = {
  color: 'DodgerBlue',
};

export default CreateEditComment;
