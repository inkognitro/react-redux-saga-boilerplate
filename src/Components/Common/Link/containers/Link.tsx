import React, { FunctionComponent } from 'react';
import './Link.scss';

export type LinkProps = {
    onClick(): void,
};

export const Link: FunctionComponent<LinkProps> = (props) => {
    return (
        <a
            href="#"
            onClick={(event) => {
                event.preventDefault();
                props.onClick();
            }}
        >
            {props.children}
        </a>
    );
};