import * as React from 'react';
import { GrabbingFeedItem } from './GrabbingFeedItem';
import { TGrabbing } from '../types';

type GrabbingFeedProps = {
  grabs: Array<TGrabbing>;
};

export const GrabbingFeed = (props: GrabbingFeedProps) => (
  <React.Fragment>
    {props.grabs.map(grab => <GrabbingFeedItem key={grab.ID} {...grab} />)}
  </React.Fragment>
);
