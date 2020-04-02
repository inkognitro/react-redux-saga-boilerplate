import React, { FunctionComponent } from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {createOpenUrl} from "Common/Router/Domain/Commands/OpenUrl";
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

export type RouterLinkProps = {
    url: string,
    target?: string,
    children: any
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch, props: RouterLinkProps) => {
    return {
        url: props.url,
        onClick: () => dispatch(createOpenUrl({url: props.url, target: props.target})),
    };
};

export const RouterLink = connect(mapStateToProps, mapDispatchToProps)(FunctionalLink);