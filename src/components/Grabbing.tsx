import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Title } from './Title';
import { TextContent } from './TextContent';
import { Author } from './Author';
import { Timestamp } from './Timestamp';
import { TGrabbing } from '../types';

export const Grabbing = (props: TGrabbing) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
  </ContentContainer>
);
