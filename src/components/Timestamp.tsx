import * as React from 'react';

type TimestampProps = {
  children: string;
};

export const Timestamp = (props: TimestampProps) => {
  const parts = props.children.slice(0, -3).split(' ');
  const date = parts[0]
    .split('-')
    .reverse()
    .map(part => parseInt(part).toString())
    .join('.');
  const time = parts[1];

  return <div className="text-timestamp">{`${time}, ${date}`}</div>;
};
