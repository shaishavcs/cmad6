
import React from 'react';
import ReactDOM from 'react-dom';
import Draft from 'draft-js';

const {Editor, Modifier, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} = Draft;

export default class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onChangeContent = this.props.onChangeContent.bind(this);
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = this.props.handleSubmit.bind(this);
}
onChange(newState) {
    console.log('BlogEditor: onChange():'+JSON.stringify(newState));
    // this.onChangeContent(newState);
}

onSubmit() {
    // submit the data to parent component
    let rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    this.handleSubmit(rawContent);
}
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    console.log('BlogEditor: _handleKeyCommand newState:'+JSON.stringify(newState));
    // this.onChangeContent(newState);
    if (newState) {
        this.onChange(newState);
        console.log('BlogEditor: onChange():'+JSON.stringify(newState));
        // this.onChangeContent(newState);
        return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    console.log('BlogEditor: _toggleBlockType:onChange() being called::this.state.editorState:'+JSON.stringify(this.state.editorState));
    // this.onChangeContent(newState);
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  _toggleInlineStyle(inlineStyle) {
    console.log('BlogEditor: _toggleInlineStyle:onChange() being called:this.state.editorState:'+JSON.stringify(this.state.editorState));
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
  }

  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    // console.log('BlogEditor: render editor.currentState:'+JSON.stringify(contentState));
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root" style={styles.root}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <ColorControls
            editorState={editorState}
            onToggle={this.toggleColor}
        />
        <div className={className} onClick={this.focus} style={styles.root}>
          <Editor
                //   customStyleMap={colorStyleMap}
                //   editorState={editorState}
                //   onChange={this.onChange}
                //   placeholder="Write something colorful..."
                //   ref={(ref) => this.editor = ref}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        <hr />
        <div className="row">
            <div className="col-sm-offset-4 col-sm-10 col-lg-2 panel">
                <button type="button" className="btn-xs btn-primary form-control" onClick={this.onSubmit}>Done Editing</button>
            </div>
        </div>

      </div>
    );
  }
}
        var COLORS = [
            {label: 'Red', style: 'red'},
            {label: 'Orange', style: 'orange'},
            {label: 'Yellow', style: 'yellow'},
            {label: 'Green', style: 'green'},
            {label: 'Blue', style: 'blue'},
            {label: 'Indigo', style: 'indigo'},
            {label: 'Violet', style: 'violet'},
        ];
        const ColorControls = (props) => {
            var currentStyle = props.editorState.getCurrentInlineStyle();
            return (
            <div style={styles.controls}>
                {COLORS.map(type =>
                <StyleButton
                    key={type.style}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
                )}
            </div>
            );
        };

      // This object provides the styling information for our custom color
      // styles.
      const colorStyleMap = {
        red: {
          color: 'rgba(255, 0, 0, 1.0)',
        },
        orange: {
          color: 'rgba(255, 127, 0, 1.0)',
        },
        yellow: {
          color: 'rgba(180, 180, 0, 1.0)',
        },
        green: {
          color: 'rgba(0, 180, 0, 1.0)',
        },
        blue: {
          color: 'rgba(0, 0, 255, 1.0)',
        },
        indigo: {
          color: 'rgba(75, 0, 130, 1.0)',
        },
        violet: {
          color: 'rgba(127, 0, 255, 1.0)',
        },
      };
// Custom overrides for "code" style.
const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    ...colorStyleMap
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    let style;
    if (this.props.active) {
      className += ' RichEditor-activeButton';
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style]};
    } else {
        style = styles.styleButton;
    }
    return (
      <span className={className} style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
// class StyleButton extends React.Component {
//     constructor(props) {
//       super(props);
//       this.onToggle = (e) => {
//         e.preventDefault();
//         this.props.onToggle(this.props.style);
//       };
//     }
//     render() {
//       let style;
//       if (this.props.active) {
//           style = { ...styles.styleButton, ...colorStyleMap[this.props.style]};
//       } else {
//         style = styles.styleButton;
//       }
//       return (
//         <span style={style} onMouseDown={this.onToggle}>
//           {this.props.label}
//         </span>
//       );
//     }
//   }

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
const styles = {
    root: {
      fontFamily: '\'Georgia\', serif',
      fontSize: 14,
      padding: 20,
      width: 600,
    },
    editor: {
      borderTop: '1px solid #ddd',
      cursor: 'text',
      fontSize: 16,
      marginTop: 20,
      minHeight: 400,
      paddingTop: 20,
    },
    controls: {
      fontFamily: '\'Helvetica\', sans-serif',
      fontSize: 14,
      marginBottom: 10,
      userSelect: 'none',
    },
    styleButton: {
      color: '#999',
      cursor: 'pointer',
      marginRight: 16,
      padding: '2px 0',
    },
  };
