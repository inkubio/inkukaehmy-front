import * as React from 'react';
import {Link} from 'react-router-dom';

interface IButtonPillLinkProps {
  text: string;
  to: string;
  primary?: boolean;
}

interface IButtonPillProps {
  text: string;
  callback: (args: any) => any;
  primary?: boolean;

}

export const ButtonPill = (props: IButtonPillProps) => (
  <button
    className={'button-pill' + (props.primary ? ' filled' : '')}
    onClick={props.callback}
  >
    {props.text}
  </button>
);

export const ButtonPillLink = (props: IButtonPillLinkProps) => (
  <Link
    className={'link-pill' + (props.primary ? ' filled' : '')}
    to={props.to}
  >
    {props.text}
  </Link>
);
