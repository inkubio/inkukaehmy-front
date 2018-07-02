import * as React from 'react';
import { Link } from 'react-router-dom';

type ButtonArrowLinkProps = {
  text: string;
  to: string;
};

export const ButtonArrowLink = (props: ButtonArrowLinkProps) => (
  <Link className="button-arrow" to={props.to}>
    {props.text}
    <i className="arrow right" />
  </Link>
);
