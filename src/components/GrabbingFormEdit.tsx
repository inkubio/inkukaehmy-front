import * as React from 'react';
import { putGrabbing } from '../functions';
import { IGrabbing } from '../types';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/themes/modern/theme';

import { ButtonPill } from './ButtonPill';

interface IGrabbingProps extends IGrabbing {
  hideCallback: () => void;
  refreshGrabbings: () => void;
}

interface IGrabbingFormState {
  text: string;
  title: string;
  is_hallitus: boolean;
}

export class GrabbingFormEdit extends React.Component<IGrabbingProps, IGrabbingFormState> {
  constructor(props: IGrabbingProps) {
    super(props);
    this.state = {
      is_hallitus: props.is_hallitus,
      text: props.text,
      title: props.title,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(event: any) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value,
    } as IGrabbingFormState);
  }

  handleTextChange(content: string) {
    this.setState({text: content})
  }

  handleBoardChange(event: any) {
    this.setState({is_hallitus:
      event.target.id === 'board' && event.target.checked})
  }

  submit(event: any) {
    event.preventDefault();
    const data = {
      ...this.state,
      tags: [],
    };
    if (putGrabbing(data, this.props.ID)) {
      this.props.refreshGrabbings();
      console.log('awsum'); //tslint:disable-line
    }
    this.props.hideCallback();
  }

  cancel(event: any) {
    event.preventDefault();
    this.props.hideCallback();
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Otsikko:</label>
          <input
            className="title-input"
            type="text"
            name="title"
            value={this.state.title} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label className="toggle-label">Haen:</label>
          <div className="toggle">
            <input
              id="official"
              defaultChecked={!this.props.is_hallitus}
              name="is_hallitus"
              type="radio"
              onChange={this.handleBoardChange}
            />
            <label className="toggle-label" htmlFor="official">Toimariksi</label>
            <input
              id="board"
              defaultChecked={this.props.is_hallitus}
              name="is_hallitus"
              type="radio"
              onChange={this.handleBoardChange}
            />
            <label className="toggle-label" htmlFor="board">Hallitukseen</label>
          </div>
        </div>

        <div className="form-group">
          <label>Leipäteksti:</label>
          <Editor
            value={this.state.text}
            init={{
              entity_encoding: 'raw',
              height: '200',
              images_upload_url: 'https://www.inkubio.fi/kahmyt/imgupload.php',
              menubar: 'edit insert format view',
              paste_data_images: true,
              plugins: 'link image code preview',
              toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright | ' +
                '| bullist numlist outdent indent | link image | preview code'
            }}
            onEditorChange={this.handleTextChange}
          />
        </div>

        <div className="form-group">
          <ButtonPill callback={this.submit} text="Muuta" primary/>
          <ButtonPill callback={this.cancel} text="Peruuta"/>
        </div>
      </form>
    );
  }
};
