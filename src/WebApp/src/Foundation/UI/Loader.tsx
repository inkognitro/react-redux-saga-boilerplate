import { connect } from "react-redux";
import {
    LoaderWC as PresentationalLoader,
    LoaderWCState as PresentationalLoaderState,
} from "Packages/Common/Loader/Web/LoaderWC";
import { RootState } from "WebApp/ServicesFactory";
import { shouldShowLoader } from "Packages/Common/Loader/Domain/Query/ShouldShowLoader";

const mapStateToProps = (state: RootState): PresentationalLoaderState => ({
    isVisible: shouldShowLoader(state.loader),
});

export const Loader = connect(mapStateToProps)(PresentationalLoader);
