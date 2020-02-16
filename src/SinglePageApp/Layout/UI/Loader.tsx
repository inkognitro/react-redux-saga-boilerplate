import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Loader as CommonLoader, LoaderProps as CommonLoaderProps} from "Common/Layout/UI/Loader/Loader";
import {HttpRequestHandlerInterface} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestHandler";

export type LoaderProps = {
    httpRequestHandler: HttpRequestHandlerInterface,
};

const mapStateToProps = ({}, props: LoaderProps) => {
    return {
        isVisible: false //props.httpRequestHandler.hasRunningRequestsWithEnabledLoader()
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<LoaderProps>;

type GlobalLoaderProps = (PropsFromRedux & CommonLoaderProps);
const GlobalLoader: FunctionComponent<GlobalLoaderProps> = (props) => (<CommonLoader {...props} />);

export const Loader = connector(GlobalLoader);