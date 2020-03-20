import {connect} from "react-redux";
import {HttpRequestManagerInterface} from "Common/RequestHandling/Domain/HttpRequestHandler";
import {Loader as PresentationalLoader, LoaderState as PresentationalLoaderState} from "Common/Layout/UI/Loader/Loader";

export type LoaderProps = {
    httpRequestManager: HttpRequestManagerInterface
};

const mapStateToProps = ({}, props: LoaderProps): PresentationalLoaderState => {
    return {
        isVisible: props.httpRequestManager.hasRunningRequestsWithEnabledLoader(),
    };
};

export const Loader = connect(mapStateToProps)(PresentationalLoader);