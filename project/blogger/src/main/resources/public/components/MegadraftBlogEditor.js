import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class MegadraftBlogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onContentChange = this.props.onContentChange.bind(this);
  }

  onChange = (editorState) => {
    this.setState({editorState});
    console.log('MegadraftBlogEditor:editorState:'+JSON.stringify(editorState));
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}/>
    )
  }
}

export default MegadraftBlogEditor;