import {connect} from "react-redux";
import {Loader as PresentationalLoader, LoaderState as PresentationalLoaderState} from "Common/Layout/UI/Loader/Loader";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {isHttpRequestRunningWithEnabledLoader} from "Common/RequestHandler/Domain/Query/HttpRequestQuery";

const mapStateToProps = (state: RootState): PresentationalLoaderState => {
    return {
        isVisible: isHttpRequestRunningWithEnabledLoader(state.requestHandling),
    };
};

export const Loader = connect(mapStateToProps)(PresentationalLoader);