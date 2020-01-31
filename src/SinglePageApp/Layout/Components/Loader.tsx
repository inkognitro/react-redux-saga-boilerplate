import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {RootState} from "SinglePageApp/App";
import {isRequestRunningWithEnabledLoader} from "Common/Application/RequestHandling/Redux/Selectors";
import {Loader as CommonLoader, LoaderProps as CommonLoaderProps} from "Common/Application/Layout/Components/Loader/Loader";

const mapStateToProps = (state: RootState) => {
    return {
        isVisible: isRequestRunningWithEnabledLoader(state.requestHandling)
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalLoaderProps = (PropsFromRedux & CommonLoaderProps);
const GlobalLoader: FunctionComponent<GlobalLoaderProps> = (props) => (<CommonLoader {...props} />);

export const Loader = connector(GlobalLoader);