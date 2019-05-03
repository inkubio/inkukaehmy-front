import * as React from 'react';
import { Link } from 'react-router-dom';

interface IButtonPillLinkProps {
  text: string;
  to: string;
  primary?: boolean;
}

interface IButtonPillProps {
  text: string;
  callback: (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>,
  ) => void;
  primary?: boolean;
}

export const ButtonPill = (props: IButtonPillProps) => (
  <button
    type="button"
    className={`button-pill${props.primary ? ' filled' : ''}`}
    onClick={props.callback}
  >
    {props.text}
  </button>
);

export const ButtonPillLink = (props: IButtonPillLinkProps) => (
  <Link
    className={`link-pill${props.primary ? ' filled' : ''}`}
    to={props.to}
    onClick={() => window.scrollTo(0, 0)}
  >
    {props.text}
  </Link>
);
