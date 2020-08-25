import { connect } from "react-redux";
import {
    Toaster as RepresentationalToaster,
    ToasterCallbacks,
    ToasterState,
} from "packages/common/toaster/ui/native";
import { Dispatch } from "redux";
import { RootState } from "mobile-app/ServicesFactory";
import { createRemoveMessage, getAllToasts } from "packages/common/toaster/domain";

const mapStateToProps = (rootState: RootState): ToasterState => ({
    toasts: getAllToasts(rootState.toaster),
});

const mapDispatchToProps = (dispatch: Dispatch): ToasterCallbacks => ({
    onRemoveMessage: (messageId: string): void => {
        dispatch(createRemoveMessage(messageId));
    },
});

export const Toaster = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepresentationalToaster);
