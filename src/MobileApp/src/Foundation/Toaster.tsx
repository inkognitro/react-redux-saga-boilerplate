import { connect } from "react-redux";
import {
    ToasterNC as RepresentationalToaster,
    ToasterWCCallbacks,
    ToasterWCState,
} from "Packages/Common/Toaster/Native";
import { Dispatch } from "redux";
import { RootState } from "MobileApp/ServicesFactory";
import { createRemoveMessage, getAllToasts } from "Packages/Common/Toaster/Domain";

const mapStateToProps = (rootState: RootState): ToasterWCState => ({
    toasts: getAllToasts(rootState.toaster),
});

const mapDispatchToProps = (dispatch: Dispatch): ToasterWCCallbacks => ({
    onRemoveMessage: (messageId: string): void => {
        dispatch(createRemoveMessage(messageId));
    },
});

export const Toaster = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepresentationalToaster);
