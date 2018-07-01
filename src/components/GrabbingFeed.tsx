import * as React from 'react';
import { GrabbingFeedItem } from './GrabbingFeedItem';
import { Grabbing } from '../functions';

type GrabbingFeedProps = {
  grabs: Array<Grabbing>;
};

export const GrabbingFeed = (props: GrabbingFeedProps) => (
  <React.Fragment>
    {props.grabs.map(grab => (
      <GrabbingFeedItem
        key={grab.ID}
        title={grab.grabbing_title}
        author={grab.userID}
        text={grab.grabbing_text}
        timestamp={grab.time_stamp}
      />
    ))}
  </React.Fragment>
);
