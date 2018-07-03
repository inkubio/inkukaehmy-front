import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { TextContent } from './TextContent';
import { Author } from './Author';
import { Timestamp } from './Timestamp';
import { TComment } from '../types';

export const Comment = (props: TComment) => (
  <ContentContainer>
    {console.log(props)}
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
  </ContentContainer>
);
