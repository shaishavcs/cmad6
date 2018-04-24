import React from 'react';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import Showdown from 'showdown';


export class BlogEditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdeState: null
    };
    this.converter = new Showdown.Converter({
      tables: false,
      simplifiedAutoLink: true
    });
  }

  handleValueChange(mdeState) {
    this.setState({ mdeState });
  };

  render() {
    return (
      <ReactMde
        onChange={this.handleValueChange}
        editorState={this.state.mdeState}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
      />
    );
  }
}
