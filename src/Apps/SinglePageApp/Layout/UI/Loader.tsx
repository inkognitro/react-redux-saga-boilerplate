import {connect} from "react-redux";
import {Loader as PresentationalLoader, LoaderState as PresentationalLoaderState} from "Common/Layout/UI/Loader/Loader";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {isHttpRequestRunningWithEnabledLoader} from "Common/RequestHandling/Domain/Base/Http/Query/HttpRequestQuery";

const mapStateToProps = (state: RootState): PresentationalLoaderState => {
    return {
        isVisible: isHttpRequestRunningWithEnabledLoader(state.requestHandler),
    };
};

export const Loader = connect(mapStateToProps)(PresentationalLoader);