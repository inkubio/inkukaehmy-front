import * as React from 'react';
import { flattenComments } from '../functions';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { Author } from './Author';
import { ButtonArrowLink } from './ButtonArrow';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

export const GrabbingFeedItem = (props: IGrabbing) => (
  <ContentContainer
    style={{borderLeft: `0.5rem solid var(--GREEN${!props.is_hallitus ? '-LIGHT' : ''})`}}
  >
    <i style={{fontSize: '0.8rem'}}>
      {props.is_hallitus ? 'Hallituskähmy:' : 'Toimarikähmy:'}
    </i>
    <Title>{props.title}</Title>
    <Author>{props.username}</Author>
    <Timestamp>{props.timestamp}</Timestamp>
    <TextContent>
      {props.text.substring(0, props.text.indexOf('</p>'))}
    </TextContent>
    <ButtonArrowLink text="Katso lisää" to={`?page=grabbing&id=${props.ID}`} />
    {props.comments &&
      <span style={{float: 'right'}}>
        {flattenComments(props.comments).length === 1
          ? '1 kommentti'
          : `${flattenComments(props.comments).length} kommenttia`
        }
      </span>
    }
  </ContentContainer>
);
