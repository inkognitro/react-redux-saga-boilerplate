import { connect } from "react-redux";
import {
    Toaster as RepresentationalToaster,
    ToasterComponentCallbacks,
    ToasterComponentState,
} from "Packages/Common/Toaster/WebUI/Toaster";
import { Dispatch } from "redux";
import { RootState } from "Apps/WebSPA/_bootstrap/ServicesFactory";
import { createRemoveMessage } from "Packages/Common/Toaster/Domain";
import { getAllToasts } from "Packages/Common/Toaster/Domain/Query/ToastQuery";

const mapStateToProps = (rootState: RootState): ToasterComponentState => ({
    toasts: getAllToasts(rootState.toaster),
    translatorState: rootState.translator,
});

const mapDispatchToProps = (dispatch: Dispatch): ToasterComponentCallbacks => ({
    onRemoveMessage: (messageId: string): void => {
        dispatch(createRemoveMessage(messageId));
    },
});

export const Toaster = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepresentationalToaster);
