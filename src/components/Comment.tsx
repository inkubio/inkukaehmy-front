import * as React from 'react';
import { IComment } from '../types';

import { Author } from './Author';
import { CommentForm } from './CommentForm';
import { CommentFormEdit } from './CommentFormEdit';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';

interface ICommentProps extends IComment {
  grabbing_ID: number;
  refreshCallback: () => void;
  currentUserID: number;
}

interface ICommentState {
  editing: boolean;
}

export class Comment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
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
      <div className="comment">
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
            {this.props.currentUserID === this.props.userID &&
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            }
            <TextContent>{this.props.text}</TextContent>
          </>
        )}
        <CommentForm
          dropdownText="Vastaa"
          parentGrabbingID={this.props.grabbing_ID}
          parentCommentID={this.props.ID}
          refreshCallback={this.props.refreshCallback}
          reply
        />
        {this.props.comments.map(subcomment =>
          <SubComment
            key={subcomment.ID}
            grabbing_ID={this.props.grabbing_ID}
            refreshCallback={this.props.refreshCallback}
            currentUserID={this.props.currentUserID}
            {...subcomment}
          />)}
      </div>
    );
  }
}

//tslint:disable
class SubComment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
    super(props);
    this.state = {
      editing: false,
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({editing: !this.state.editing});
  }

  render(): any {
    return (
      <div className="subcomment">
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
            {this.props.currentUserID === this.props.userID &&
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            }
            <TextContent>{this.props.text}</TextContent>
          </>
        )}
        <CommentForm
          dropdownText="Vastaa"
          parentGrabbingID={this.props.grabbing_ID}
          parentCommentID={this.props.ID}
          refreshCallback={this.props.refreshCallback}
          reply
        />
        {this.props.comments.map(subcomment =>
          <SubComment
            key={subcomment.ID}
            grabbing_ID={this.props.grabbing_ID}
            refreshCallback={this.props.refreshCallback}
            currentUserID={this.props.currentUserID}
            {...subcomment}
          />)}
      </div>
    );
  }
}
