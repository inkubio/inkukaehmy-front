import * as React from 'react';
import { ContentContainer } from '../components/ContentContainer';
import { Title } from './Title';
import { TextContent } from './TextContent';
import { Author } from './Author';
import { Timestamp } from './Timestamp';
import { ButtonArrowLink } from './ButtonArrow';
import { TGrabbing } from '../types';

export const GrabbingFeedItem = (props: TGrabbing) => (
  <ContentContainer>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>{props.text}</TextContent>
    <ButtonArrowLink text="See more" to={`/grabbing/${props.ID}`} />
  </ContentContainer>
);