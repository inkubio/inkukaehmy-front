import * as React from 'react';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/themes/modern/theme';

import { ButtonPill } from '../components/ButtonPill';
import { postComment } from '../functions';

interface ICommentFormProps {
  dropdownText: string;
  parentGrabbingID: number;
  parentCommentID?: number;
  refreshCallback: () => any;
  reply?: boolean;
}

interface ICommentFormState {
  text: string;
  visible: boolean;
}

export class CommentForm extends React.Component<ICommentFormProps, ICommentFormState> {
  constructor(props: ICommentFormProps) {
    super(props);
    this.state = {
      text: '<p>Insert comment pls</p>',
      visible: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  handleTextChange(content: string) {
    this.setState({text: content})
  }

  toggleVisible() {
    this.setState({visible: !this.state.visible});
  }

  async submit(refreshCallback: () => void, event: any) {
    event.preventDefault();
    const data = {
      parent_comment_id: this.props.parentCommentID,
      parent_grabbing_id: this.props.parentGrabbingID,
      text: this.state.text,
    };
    if ((await postComment(data)) !== false) {
      this.setState({
        text: '<p>Kommentti lähetetty! Vielä lisää?</p>',
        visible: false,
      })
      refreshCallback();
    } else {
      alert('opi koodaa');
    }
  }

  render() {
    return this.state.visible ? (
      <>
        <div>
          <a
            className="button-arrow"
            onClick={this.toggleVisible}
            style={this.props.reply ? {fontSize: '0.8rem'} : undefined}
          >
            {this.props.dropdownText}
            <i className={'arrow up' + (this.props.reply ? ' small' : '')} />
          </a>
        </div>

        <form>
          <div className="form-group">
            <label style={{lineHeight: '2rem'}}>Uusi kommentti:</label>
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
            <ButtonPill
              callback={(e) => this.submit(this.props.refreshCallback, e)}
              text="Lähetä!"
              primary
            />
          </div>
        </form>
      </>
    ) : (
      <div>
        <a
          className="button-arrow"
          onClick={this.toggleVisible}
          style={this.props.reply ? {fontSize: '0.8rem'} : undefined}
        >
          {this.props.dropdownText}
          <i className={'arrow down' + (this.props.reply ? ' small' : '')} />
        </a>
      </div>
    );
  }
}