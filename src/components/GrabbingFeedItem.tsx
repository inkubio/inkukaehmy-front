import * as React from 'react';
import { flattenComments } from 'src/functions';
import { IGrabbing } from 'src/types';

import { ContentContainer } from 'src/components/ContentContainer';
import { Author } from 'src/components/Author';
import { ButtonArrowLink } from 'src/components/ButtonArrow';
import { TextContent } from 'src/components/TextContent';
import { Timestamp } from 'src/components/Timestamp';
import { Title } from 'src/components/Title';

interface IFeedItemState {
  expanded: boolean;
}

export class GrabbingFeedItem extends React.Component<IGrabbing, IFeedItemState> {
  constructor(props: IGrabbing) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prev => ({ expanded: !prev.expanded }));
  }

  render() {
    return (
      <ContentContainer
        style={{
          borderLeft: `0.5rem solid ${this.props.is_hallitus ? 'var(--GREEN)' : '#c0c0c0'}`,
        }}
      >
        <i style={{ fontSize: '0.8rem' }}>
          {this.props.is_hallitus ? 'Hallituskähmy:' : 'Toimarikähmy:'}
        </i>
        <Title>{this.props.title}</Title>
        <Author>{this.props.username}</Author>
        <Timestamp>{this.props.timestamp}</Timestamp>
        <TextContent>
          {this.state.expanded
            ? this.props.text
            : this.props.text.substring(0, this.props.text.indexOf('</p>')) +
              (this.props.text.length - 4 !== this.props.text.indexOf('</p>')
                ? '<div style="margin-top: -0.5em;">...</div>'
                : '')}
        </TextContent>
        {this.props.text.length - 4 !== this.props.text.indexOf('</p>') && (
          <a className="button-arrow" onClick={this.toggle}>
            {this.state.expanded ? 'Näytä vähemmän' : 'Näytä kokonaan'}
            <i className={`arrow ${this.state.expanded ? 'up' : 'down'}`} />
          </a>
        )}

        <ButtonArrowLink
          text={
            this.props.comments && flattenComments(this.props.comments).length === 1
              ? '1 kommentti'
              : `${this.props.comments && flattenComments(this.props.comments).length} kommenttia`
          }
          to={`?page=grabbing&id=${this.props.ID}`}
          style={{ float: 'right' }}
        />
      </ContentContainer>
    );
  }
}
