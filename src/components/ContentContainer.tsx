import * as React from 'react';

type ContentContainerProps = {
  children: any;
};

export const ContentContainer = (props: ContentContainerProps) => (
  <div className="content">{props.children}</div>
);
