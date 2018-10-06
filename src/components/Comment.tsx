import * as React from 'react';
import { IComment } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { Author } from './Author';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';

export const Comment = (props: IComment) => (
  <ContentContainer>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
  </ContentContainer>
);
