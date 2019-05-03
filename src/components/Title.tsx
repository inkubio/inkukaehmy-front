import * as React from 'react';

interface ITitleProps {
  children: string;
}

export const Title = (props: ITitleProps) => <h2 className="text-title">{props.children}</h2>;

export const PageTitle = (props: ITitleProps) => (
  <h1 className="text-page-title">{props.children}</h1>
);
