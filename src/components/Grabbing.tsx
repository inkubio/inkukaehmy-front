import * as React from 'react';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { Author } from './Author';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

export const Grabbing = (props: IGrabbing) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
  </ContentContainer>
);
