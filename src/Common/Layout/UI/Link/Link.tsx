import React, { FunctionComponent } from 'react';
import './Link.scss';

export type FunctionalLinkProps = {
    onClick(): void,
    className?: string,
    infoUrl?: string,
};

export const FunctionalLink: FunctionComponent<FunctionalLinkProps> = (props) => {
    return (
        <a
            href={(props.infoUrl ? props.infoUrl : '')}
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
    className?: string
    url: string,
    target?: string
};

export const Link: FunctionComponent<LinkProps> = (props) => {
    return (
        <FunctionalLink
            infoUrl={props.url}
            onClick={() => {
                if(!props.target || props.target === '_self') {
                    console.log('open link'); //foo!
                    return;
                }
                window.open(props.url, props.target);
            }}
        >
            {props.children}
        </FunctionalLink>
    );
};
