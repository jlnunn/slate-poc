import React, {Component, Fragment} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { BoldMark, ItalicMark, FormatToolbar } from './index';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Example text! You can type additional stuff here.',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default class ExampleEditor extends Component {

  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value })
  };

  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) {return next()}
    event.preventDefault();
    switch (event.key) {
      case 'b': {
        editor.toggleMark('bold');
        return true;
      }
      case 'i': {
        editor.toggleMark('italic');
        return true;
      }
      default: {
        return next();
      }
    }
  };

  onMarkClick = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
    }
  };

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            onPointerDown={(e) => this.onMarkClick(e,'bold')}
            className="tooltip-icon-button"
          >
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e,'italic')}
            className="tooltip-icon-button"
          >
            <Icon icon={italic} />
          </button>
        </FormatToolbar>
        <Editor
          ref={editor => this.editor = editor}
          value={this.state.value}
          onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark}
        />
      </Fragment>
    );
  }
}