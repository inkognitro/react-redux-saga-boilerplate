import React, { FunctionComponent } from 'react';
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
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
    currentRouteManager: CurrentRouteManagerInterface,
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
                    props.currentRouteManager.setCurrentRouteUrl(props.url);
                    return;
                }
                window.open(props.url, props.target);
            }}
        >
            {props.children}
        </FunctionalLink>
    );
};
