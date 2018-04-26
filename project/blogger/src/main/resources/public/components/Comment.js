import React from 'react';
import store from '../store/blogger_store.js';

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='col-lg-12 panel'  style={{backgroundColor: 'lightblue'}}>
            {this.props.comment ?
                <div className="row panel">
                    <div className="row ">
                        <div className="col-lg-8">
                            <h6 style={commentedByStyle}>{this.props.comment.commentedBy.userId}</h6>
                        </div>
                        <div className="col-lg-4">
                            <h6 style={commentedByStyle}>{new Date(this.props.comment.postedDate).toUTCString()}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>{this.props.comment.commentContent}</h6>
                        </div>
                    </div>
                </div>
             : ''
            }
            </div>
        )
    };
}

const commentedByStyle = {
  color: 'DodgerBlue',
};

export default Comment;
