import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Title } from './Title';
import { TextContent } from './TextContent';
import { Author } from './Author';
import { Timestamp } from './Timestamp';

type GrabbingFeedItem = {
  title: string;
  text: string;
  author: string;
  timestamp: string;
};

export const GrabbingFeedItem = (props: GrabbingFeedItem) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.author}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
  </ContentContainer>
);
