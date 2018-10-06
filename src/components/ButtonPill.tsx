import * as React from 'react';
import {Link} from 'react-router-dom';

interface IButtonPillLinkProps {
    text: string
    to: string
}

interface IButtonPillProps {
    text: string
    callback: () => any
}

export const ButtonPill = (props: IButtonPillProps) => (
    <a className="button-pill" onClick={props.callback}>
        {props.text}
    </a>
);

export const ButtonPillLink = (props: IButtonPillLinkProps) => (
    <Link className="button-pill" to={props.to}>
        {props.text}
    </Link>
);
