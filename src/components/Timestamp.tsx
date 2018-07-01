import * as React from 'react';

type TimestampProps = {
  children: string;
};

export const Timestamp = (props: TimestampProps) => (
  <div className="text-timestamp">{props.children}</div>
);
