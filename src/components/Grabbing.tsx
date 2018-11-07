import * as React from 'react';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { GrabbingFormEdit } from '../components/GrabbingFormEdit';
import { Author } from './Author';
import { CommentForm } from './CommentForm';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

interface IGrabbingProps extends IGrabbing {
  refreshCallback: () => void;
  refreshGrabbings: () => void;
  editable?: boolean;
}

interface IGrabbingState {
  editing: boolean;
}

export class Grabbing extends React.Component<IGrabbingProps, IGrabbingState> {
  constructor(props: IGrabbingProps) {
    super(props);
    this.state = {
      editing: false,
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({editing: !this.state.editing});
  }

  render() {
    return (
      <ContentContainer>
        {this.state.editing ? (
          <GrabbingFormEdit
            {...this.props}
            hideCallback={() => this.toggle()}
            refreshGrabbings={() => this.props.refreshGrabbings()}
          />
        ) : (
          <>
            <Title>{this.props.title}</Title>
            <Author>{this.props.username}</Author>
            <Timestamp>{this.props.timestamp}</Timestamp>
            {this.props.editable &&
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            }
            <TextContent>{this.props.text}</TextContent>
            <div style={{marginTop: '2rem'}}>
              <CommentForm
                dropdownText="Kommentoi"
                parentGrabbingID={this.props.ID}
                refreshCallback={this.props.refreshCallback}
              />
            </div>
          </>
        )}
      </ContentContainer>
    );
  }
}