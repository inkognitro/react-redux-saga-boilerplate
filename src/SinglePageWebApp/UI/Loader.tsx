import { connect } from "react-redux";
import {
    Loader as PresentationalLoader,
    LoaderState as PresentationalLoaderState,
} from "Packages/Common/UI/Web/Loader/Loader";
import { RootState } from "SinglePageWebApp/Bootstrap/ServicesFactory";
import { shouldShowLoader } from "Packages/Common/Domain/Loader/Query/ShouldShowLoader";

const mapStateToProps = (state: RootState): PresentationalLoaderState => ({
    isVisible: shouldShowLoader(state.loader),
});

export const Loader = connect(mapStateToProps)(PresentationalLoader);
