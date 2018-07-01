import * as React from 'react';

type TitleProps = {
  children: string;
};

export const Title = (props: TitleProps) => (
  <h1 className="text-title">{props.children}</h1>
);
