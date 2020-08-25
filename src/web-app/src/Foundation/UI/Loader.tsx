import { connect } from "react-redux";
import {
    LoaderWC as PresentationalLoader,
    LoaderWCState as PresentationalLoaderState,
} from "packages/common/loader/ui/web";
import { RootState } from "web-app/ServicesFactory";
import { shouldShowLoader } from "packages/common/loader/domain";

const mapStateToProps = (state: RootState): PresentationalLoaderState => ({
    isVisible: shouldShowLoader(state.loader),
});

export const Loader = connect(mapStateToProps)(PresentationalLoader);
