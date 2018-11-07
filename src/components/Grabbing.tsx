import * as React from 'react';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { Author } from './Author';
import { CommentForm } from './CommentForm';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

interface IGrabbingProps extends IGrabbing {
  refreshCallback: () => void;
}

export const Grabbing = (props: IGrabbingProps) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
    <div style={{marginTop: '2rem'}}>
      <CommentForm
        dropdownText="Kommentoi"
        parentGrabbingID={props.ID}
        refreshCallback={props.refreshCallback}
      />
    </div>
  </ContentContainer>
);
