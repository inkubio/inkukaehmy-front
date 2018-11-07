import * as React from 'react';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/themes/modern/theme';

import { IComment } from 'src/types';
import { putComment } from '../functions';
import { ButtonPill } from './ButtonPill';

interface ICommentFormProps extends IComment{
  hideCallback: () => void;
  refreshCallback: () => any;
  reply?: boolean;
}

interface ICommentFormState {
  text: string;
}

export class CommentFormEdit extends React.Component<ICommentFormProps, ICommentFormState> {
  constructor(props: ICommentFormProps) {
    super(props);
    this.state = {
      text: props.text,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleTextChange(content: string) {
    this.setState({text: content})
  }

  cancel(event: any) {
    event.preventDefault();
    this.props.hideCallback();
  }

  async submit(event: any) {
    event.preventDefault();
    const data = {
      text: this.state.text,
    };
    if ((await putComment(data, this.props.ID)) !== false) {
      this.props.refreshCallback();
      this.props.hideCallback();
    } else {
      alert('opi koodaa');
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label style={{lineHeight: '2rem'}}>Muokkaa kommenttia:</label>
          <Editor
            value={this.state.text}
            init={{
              entity_encoding: 'raw',
              height: '200',
              menubar: 'edit insert format view',
              plugins: 'link image code preview',
              toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright | ' +
                '| bullist numlist outdent indent | link image | preview code'
            }}
            onEditorChange={this.handleTextChange}
          />
        </div>
        <div className="form-group">
          <ButtonPill callback={this.submit} text="Muuta" primary />
          <ButtonPill callback={this.cancel} text="Peruuta"/>
        </div>
      </form>
    );
  }
}