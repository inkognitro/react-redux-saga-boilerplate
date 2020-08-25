import { connect } from "react-redux";
import {
    Toaster as RepresentationalToaster,
    ToasterWCCallbacks,
    ToasterWCState,
} from "packages/common/toaster/ui/web";
import { Dispatch } from "redux";
import { RootState } from "web-app/ServicesFactory";
import { createRemoveMessage, getAllToasts } from "packages/common/toaster/domain";

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
