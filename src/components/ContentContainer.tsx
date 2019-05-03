import * as React from 'react';

interface IContentContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ContentContainer = (props: IContentContainerProps) => (
  <div className="content" style={props.style}>
    {props.children}
  </div>
);
