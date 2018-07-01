import * as React from 'react';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import * as Showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';

interface AppState {
  mdeState: ReactMdeTypes.MdeState;
}

export class MarkdownEditor extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

  constructor(props: any) {
    super(props);
    //@ts-ignore
    this.state = {
      mdeState: null,
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      extensions: [xssFilter],
    });
  }

  handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
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
