import {connect} from "react-redux";
import {Loader as PresentationalLoader, LoaderState as PresentationalLoaderState} from "Common/UI/Base/Loader/Loader";
import {RootState} from "../../ServicesFactory";
import {isHttpRequestRunningWithEnabledLoader} from "Common/Domain/RequestHandling/Base/Http/Query/HttpRequestQuery";

const mapStateToProps = (state: RootState): PresentationalLoaderState => {
    return {
        isVisible: isHttpRequestRunningWithEnabledLoader(state.requestHandler),
    };
};

export const Loader = connect(mapStateToProps)(PresentationalLoader);