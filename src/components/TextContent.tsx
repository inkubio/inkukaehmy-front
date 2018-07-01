import * as React from 'react';

type TextContentProps = {
  children: string;
};

export const TextContent = (props: TextContentProps) => (
  <div className="text-basic">{props.children}</div>
);
