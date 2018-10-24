import * as React from 'react';
import {Link} from 'react-router-dom';

interface IButtonPillLinkProps {
    text: string
    to: string
}

interface IButtonPillProps {
    text: string
    callback: (args: any) => any
}

export const ButtonPill = (props: IButtonPillProps) => (
    <button className="button-pill" onClick={props.callback}>
        {props.text}
    </button>
);

export const ButtonPillLink = (props: IButtonPillLinkProps) => (
    <Link className="link-pill" to={props.to}>
        {props.text}
    </Link>
);
