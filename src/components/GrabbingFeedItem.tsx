import * as React from 'react';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { Author } from './Author';
import { ButtonArrowLink } from './ButtonArrow';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

export const GrabbingFeedItem = (props: IGrabbing) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>
      {props.text.substring(0, props.text.indexOf('</p>'))}
    </TextContent>
    <ButtonArrowLink text="See more" to={`?page=grabbing&id=${props.ID}`} />
  </ContentContainer>
);
