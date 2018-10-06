import * as React from 'react';
import { IGrabbing } from '../types';

import { GrabbingFeedItem } from './GrabbingFeedItem';

interface IGrabbingFeedProps {
  grabs: IGrabbing[];
};

export const GrabbingFeed = (props: IGrabbingFeedProps) => (
  <React.Fragment>
    {props.grabs.map(grab => <GrabbingFeedItem key={grab.ID} {...grab} />)}
  </React.Fragment>
);
