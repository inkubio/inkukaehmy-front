import * as React from 'react';
import { IGrabbing } from 'src/types';

import { ContentContainer } from 'src/components/ContentContainer';
import { GrabbingFormEdit } from 'src/components/GrabbingFormEdit';
import { Author } from 'src/components/Author';
import { CommentForm } from 'src/components/CommentForm';
import { TextContent } from 'src/components/TextContent';
import { Timestamp } from 'src/components/Timestamp';
import { Title } from 'src/components/Title';

interface IGrabbingProps extends IGrabbing {
  refreshCallback: () => void;
  refreshGrabbings: () => void;
  currentUserID: number;
}

interface IGrabbingState {
  editing: boolean;
}

export class Grabbing extends React.Component<IGrabbingProps, IGrabbingState> {
  constructor(props: IGrabbingProps) {
    super(props);
    this.state = {
      editing: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prev => ({ editing: !prev.editing }));
  }

  render() {
    return (
      <ContentContainer
        style={{
          borderLeft: `0.5rem solid ${this.props.is_hallitus ? 'var(--GREEN)' : '#c0c0c0'}`,
        }}
      >
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
            {this.props.currentUserID === this.props.userID && (
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            )}
            <TextContent>{this.props.text}</TextContent>
            <div style={{ marginTop: '2rem' }}>
              {this.props.currentUserID > 0 ? (
                <CommentForm
                  dropdownText="Kommentoi"
                  parentGrabbingID={this.props.ID}
                  refreshCallback={this.props.refreshCallback}
                />
              ) : (
                <i>Kirjaudu sisään kommentoidaksesi!</i>
              )}
            </div>
          </>
        )}
      </ContentContainer>
    );
  }
}
