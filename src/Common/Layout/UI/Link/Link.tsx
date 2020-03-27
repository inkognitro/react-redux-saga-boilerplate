import React, { FunctionComponent } from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {createOpenUrlAction} from "Common/Routing/Domain/Commands/OpenUrl";
import './Link.scss';

type FunctionalLinkProps = {
    url?: string,
    onClick: () => void,
};

export const FunctionalLink: FunctionComponent<FunctionalLinkProps> = (props) => {
    return (
        <a
            className="app-link"
            href={(props.url ? props.url : '#')}
            onClick={(event) => {
                event.preventDefault();
                props.onClick();
            }}
        >
            {props.children}
        </a>
    );
};

export enum Targets {
    SELF = '_self',
    BLANK = '_blank',
}

export type RouterLinkProps = {
    url: string,
    target?: (string | Targets),
    children: any
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch, props: RouterLinkProps) => {
    return {
        url: props.url,
        onClick: () => dispatch(
            createOpenUrlAction({
                url: props.url,
                target: props.target,
            })
        ),
    };
};

export const RouterLink = connect(mapStateToProps, mapDispatchToProps)(FunctionalLink);