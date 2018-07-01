import * as React from 'react';

type TitleProps = {
  children: string;
};

export const Title = (props: TitleProps) => (
  <h2 className="text-title">{props.children}</h2>
);

export const PageTitle = (props: TitleProps) => (
  <h1 className="text-page-title">{props.children}</h1>
);
