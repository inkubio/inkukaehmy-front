import * as React from 'react';
import { Link } from 'react-router-dom';

interface IButtonArrowLinkProps {
  text: string;
  to: string;
  style?: React.CSSProperties;
}

export const ButtonArrowLink = (props: IButtonArrowLinkProps) => (
  <Link
    className="button-arrow"
    style={props.style}
    to={props.to}
    onClick={() => window.scrollTo(0, 0)}
  >
    {props.text}
    <i className="arrow right" />
  </Link>
);
