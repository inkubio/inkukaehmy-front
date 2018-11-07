import * as React from 'react';
import { IComment } from '../types';

import { Author } from './Author';
import { CommentForm } from './CommentForm';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';

interface ICommentProps extends IComment {
  grabbing_ID: number;
  refreshCallback: () => void;
}

export const Comment: React.SFC<ICommentProps> = (props) => (
  <div className="comment">
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
    <CommentForm
      dropdownText="Vastaa"
      parentGrabbingID={props.grabbing_ID}
      parentCommentID={props.ID}
      refreshCallback={props.refreshCallback}
      reply
    />
    {props.comments.map(subcomment =>
      <SubComment
        key={subcomment.ID}
        grabbing_ID={props.grabbing_ID}
        refreshCallback={props.refreshCallback}
        {...subcomment}
      />)}
  </div>
);

const SubComment: React.SFC<ICommentProps> = (props) => (
  <div className="subcomment">
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
    <CommentForm
      dropdownText="Vastaa"
      parentGrabbingID={props.grabbing_ID}
      parentCommentID={props.ID}
      refreshCallback={props.refreshCallback}
      reply
    />
    {props.comments.map(subcomment =>
      <SubComment
        key={subcomment.ID}
        grabbing_ID={props.grabbing_ID}
        refreshCallback={props.refreshCallback}
        {...subcomment}
      />)}
  </div>
)
