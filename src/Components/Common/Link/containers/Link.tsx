import React, { FunctionComponent } from 'react';

type LinkProps = {
    onClick(): void,
}

const Link: FunctionComponent<LinkProps> = (props) => {
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

export default Link;