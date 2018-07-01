import * as React from 'react';

type AuthorProps = {
  children: string;
};

export const Author = (props: AuthorProps) => (
  <div className="text-author">{props.children}</div>
);
