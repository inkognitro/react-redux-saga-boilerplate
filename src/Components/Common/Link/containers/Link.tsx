import React, { FunctionComponent } from 'react';

export type LinkProps = {
    onClick(): void,
}

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