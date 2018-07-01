import * as React from 'react';
import {Link} from 'react-router-dom';

type ButtonPillLinkProps = {
    text: string
    to: string
}

type ButtonPillProps = {
    text: string
    callback: () => any
}

export const ButtonPill = (props: ButtonPillProps) => (
    <a className="button-pill" onClick={props.callback}>
        {props.text}
    </a>
);

export const ButtonPillLink = (props: ButtonPillLinkProps) => (
    <Link className="button-pill" to={props.to}>
        {props.text}
    </Link>
);
