import { connect } from "react-redux";
import {
    Toaster as RepresentationalToaster,
    ToasterComponentCallbacks,
    ToasterComponentState,
} from "Packages/Common/UI/Web/Toaster/Toaster";
import { Dispatch } from "redux";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { createRemoveMessage } from "Packages/Common/Domain/Toaster";
import { getAllToasts } from "Packages/Common/Domain/Toaster/Query/ToastQuery";

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
