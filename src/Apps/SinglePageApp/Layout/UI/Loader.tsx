import {connect} from "react-redux";
import {Loader as PresentationalLoader, LoaderState as PresentationalLoaderState} from "Common/Layout/UI/Loader/Loader";
import {RootState} from "SinglePageApp/AppBase/Store";
import {isHttpRequestRunningWithEnabledLoader} from "Common/RequestHandling/Domain/Query/IsHttpRequestRunningWithEnabledLoaderQuery";

const mapStateToProps = (state: RootState): PresentationalLoaderState => {
    return {
        isVisible: isHttpRequestRunningWithEnabledLoader(state.requestHandling),
    };
};

export const Loader = connect(mapStateToProps)(PresentationalLoader);