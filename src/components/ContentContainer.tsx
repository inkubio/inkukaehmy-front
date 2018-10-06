import * as React from 'react';

interface IContentContainerProps {
  children: any;
};

export const ContentContainer = (props: IContentContainerProps) => (
  <div className="content">{props.children}</div>
);
