import * as React from 'react';
import { Link } from 'react-router-dom';

interface IButtonArrowLinkProps {
  text: string;
  to: string;
};

export const ButtonArrowLink = (props: IButtonArrowLinkProps) => (
  <Link className="button-arrow" to={props.to}>
    {props.text}
    <i className="arrow right" />
  </Link>
);
