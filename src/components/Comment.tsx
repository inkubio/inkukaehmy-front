import * as React from 'react';
import { IComment } from 'src/types';

import { Author } from 'src/components/Author';
import { CommentForm } from 'src/components/CommentForm';
import { CommentFormEdit } from 'src/components/CommentFormEdit';
import { TextContent } from 'src/components/TextContent';
import { Timestamp } from 'src/components/Timestamp';

interface ICommentProps extends IComment {
  grabbing_ID: number;
  refreshCallback: () => void;
  currentUserID: number;
}

interface ICommentState {
  editing: boolean;
  highlighted: boolean;
}

export class Comment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
    super(props);
    this.state = {
      editing: false,
      highlighted: window.location.hash.substring(1) === this.props.ID.toString(),
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    setTimeout(() => this.setState({ highlighted: false }), 1000);
  }

  toggle() {
    this.setState(prev => ({ editing: !prev.editing }));
  }

  render() {
    return (
      <div className={`comment${this.state.highlighted ? ' highlight' : ''}`}>
        <Author>{this.props.username}</Author>
        <Timestamp>{this.props.timestamp}</Timestamp>
        {this.state.editing ? (
          <CommentFormEdit
            {...this.props}
            hideCallback={() => this.toggle()}
            refreshCallback={() => this.props.refreshCallback()}
          />
        ) : (
          <>
            {this.props.currentUserID === this.props.userID && (
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            )}
            <TextContent>{this.props.text}</TextContent>
          </>
        )}
        {this.props.currentUserID > 0 && (
          <CommentForm
            dropdownText="Vastaa"
            parentGrabbingID={this.props.grabbing_ID}
            parentCommentID={this.props.ID}
            refreshCallback={this.props.refreshCallback}
            reply
          />
        )}
        {this.props.comments.map(subcomment => (
          <SubComment
            key={subcomment.ID}
            grabbing_ID={this.props.grabbing_ID}
            refreshCallback={this.props.refreshCallback}
            currentUserID={this.props.currentUserID}
            {...subcomment}
          />
        ))}
      </div>
    );
  }
}

// eslint-disable-next-line
class SubComment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
    super(props);
    this.state = {
      editing: false,
      highlighted: window.location.hash.substring(1) === this.props.ID.toString(),
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    setTimeout(() => this.setState({ highlighted: false }), 1000);
  }

  toggle() {
    this.setState(prev => ({ editing: !prev.editing }));
  }

  render() {
    return (
      <div className={`subcomment${this.state.highlighted ? ' highlight' : ''}`}>
        <Author>{this.props.username}</Author>
        <Timestamp>{this.props.timestamp}</Timestamp>
        {this.state.editing ? (
          <CommentFormEdit
            {...this.props}
            hideCallback={() => this.toggle()}
            refreshCallback={() => this.props.refreshCallback()}
          />
        ) : (
          <>
            {this.props.currentUserID === this.props.userID && (
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            )}
            <TextContent>{this.props.text}</TextContent>
          </>
        )}
        {this.props.currentUserID > 0 && (
          <CommentForm
            dropdownText="Vastaa"
            parentGrabbingID={this.props.grabbing_ID}
            parentCommentID={this.props.ID}
            refreshCallback={this.props.refreshCallback}
            reply
          />
        )}
        {this.props.comments.map(subcomment => (
          <SubComment
            key={subcomment.ID}
            grabbing_ID={this.props.grabbing_ID}
            refreshCallback={this.props.refreshCallback}
            currentUserID={this.props.currentUserID}
            {...subcomment}
          />
        ))}
      </div>
    );
  }
}
