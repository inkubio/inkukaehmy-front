import * as React from 'react';

interface IAuthorProps {
  children: string;
};

export const Author = (props: IAuthorProps) => (
  <div className="text-author">{props.children}</div>
);
