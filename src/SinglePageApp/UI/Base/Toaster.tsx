import { connect } from "react-redux";
import {
    Toaster as RepresentationalToaster,
    ToasterComponentCallbacks,
    ToasterComponentState,
} from "Common/UI/Toaster/Toaster";
import { Dispatch } from "redux";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { createRemoveMessage } from "Common/Domain/Toaster/Command/RemoveMessage";
import { getAllToasts } from "Common/Domain/Toaster/Query/ToastQuery";

const mapStateToProps = (rootState: RootState): ToasterComponentState => ({
    toasts: getAllToasts(rootState.toaster),
});

const mapDispatchToProps = (dispatch: Dispatch): ToasterComponentCallbacks => ({
    onRemoveMessage: (messageId: string) => dispatch(createRemoveMessage(messageId)),
});

export const Toaster = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepresentationalToaster);
