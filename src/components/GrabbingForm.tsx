import * as React from 'react';
import { postGrabbing } from '../functions';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/themes/modern/theme';

import { ButtonPill } from '../components/ButtonPill';

interface IGrabbingFormState {
  text: string;
  title: string;
  is_hallitus: boolean;
}

export class GrabbingForm extends React.Component<{}, IGrabbingFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      is_hallitus: false,
      text: '<p>Insert kähmy here!</p>',
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.submit = this.submit.bind(this);
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
      batch: '2018',
      tags: [],
    };
    const resp = postGrabbing(data);
    console.log(resp); // tslint:disable-line
    if (resp) {
      window.location = '/kiltalaisille/hallinto/kahmyt/' as any;
    } else {
      alert("nyt kävi hassusti, laita TGssä viestiä @jonesus");
      console.log(resp); // tslint:disable-line
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label><strong>Otsikko:</strong> <i>(esim. haettava virka)</i></label>
          <input
            className="title-input"
            type="text"
            name="title"
            value={this.state.title} 
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label className="toggle-label"><strong>Haen:</strong></label>
          <div className="toggle">
            <input
              id="official"
              name="is_hallitus"
              type="radio"
              onChange={this.handleBoardChange}
            />
            <label className="toggle-label" htmlFor="official">Toimariksi</label>
            <input
              id="board"
              name="is_hallitus"
              type="radio"
              onChange={this.handleBoardChange}
            />
            <label className="toggle-label" htmlFor="board">Hallitukseen</label>
          </div>
        </div>

        <div className="form-group">
          <label><strong>Leipäteksti:</strong> <i>(kerro mitä ja miksi, ja vaikka hieman itsestäsi!)</i></label>
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
          <ButtonPill callback={this.submit} text="Kähmyä!" primary/>
        </div>
      </form>
    );
  }
};
