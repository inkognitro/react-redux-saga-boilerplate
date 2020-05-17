import { connect } from "react-redux";
import {
    Loader as PresentationalLoader,
    LoaderState as PresentationalLoaderState,
} from "Common/UI/Loader/Loader";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { shouldShowLoader } from "Common/Domain/Loader/Query/ShouldShowLoader";

const mapStateToProps = (state: RootState): PresentationalLoaderState => ({
    isVisible: shouldShowLoader(state.loader),
});

export const Loader = connect(mapStateToProps)(PresentationalLoader);
