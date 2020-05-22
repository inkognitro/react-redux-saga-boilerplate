import { connect } from "react-redux";
import {
    Loader as PresentationalLoader,
    LoaderState as PresentationalLoaderState,
} from "Packages/Common/Loader/WebUI/Loader";
import { RootState } from "Apps/WebSPA/_bootstrap/ServicesFactory";
import { shouldShowLoader } from "Packages/Common/Loader/Domain/Query/ShouldShowLoader";

const mapStateToProps = (state: RootState): PresentationalLoaderState => ({
    isVisible: shouldShowLoader(state.loader),
});

export const Loader = connect(mapStateToProps)(PresentationalLoader);
