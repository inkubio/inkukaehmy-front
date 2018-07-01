import * as React from 'react';

type ContentContainerProps = {
  children: any;
};

const ContentContainer = (props: ContentContainerProps) => (
  <div className="content">{props.children}</div>
);

export default ContentContainer;
