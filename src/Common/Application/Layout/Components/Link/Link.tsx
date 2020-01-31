import React, { FunctionComponent } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import './Link.scss';

export type FunctionalLinkProps = {
    onClick(): void,
    className?: string,
};

export const FunctionalLink: FunctionComponent<FunctionalLinkProps> = (props) => {
    return (
        <a
            href=""
            className={props.className}
            onClick={(event) => {
                event.preventDefault();
                props.onClick();
            }}
        >
            {props.children}
        </a>
    );
};

export type LinkProps = {
    url: string,
};

export const Link: FunctionComponent<LinkProps> = (props) => {
    return (
        <RouterLink to={props.url}>
            {props.children}
        </RouterLink>
    );
};
