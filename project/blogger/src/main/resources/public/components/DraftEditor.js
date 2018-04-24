import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.onChangeContent = this.props.onChangeContent.bind(this);
    this.onChangeEditorContent = this.onChangeEditorContent.bind(this);
    if (this.props.handleSubmit) {
      this.handleSubmit = this.props.handleSubmit.bind(this);
    }
  }
  onChangeEditorContent(event) {
    // console.log("DraftEditor: onChangeEditorContent:event.target.value:"+JSON.stringify(event.target.value));
    this.props.onChangeContent(event);
  }
  render() {
    return (
        <div className="row panel" >
            <textarea  rows="3" onChange={this.onChangeEditorContent} name="commentContent"/>
            {this.handleSubmit ?
            <div className="col-lg-2 row">
              <button className="btn-xs btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
            : ''
            }
            {/* editorState={this.state.editorState} */}
        </div>
    );
  }
}
export default DraftEditor;