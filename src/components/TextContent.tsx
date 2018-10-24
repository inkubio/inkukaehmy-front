import * as React from 'react';

interface ITextContentProps {
  children: string;
};

export const TextContent = (props: ITextContentProps) => (
  <div className="text-basic" dangerouslySetInnerHTML={{__html: props.children}} />
);
