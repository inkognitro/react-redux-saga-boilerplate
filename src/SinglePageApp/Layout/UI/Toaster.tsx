import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toaster';
import {Dispatch} from "redux";
import {createRemoveToastCommandAction} from "Common/Toaster/Domain/Command/RemoveToast";
import {getToasts} from "Common/Toaster/Domain/Query";
import {createToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";
import {createBlockToastForMessageReceivingCommandAction} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {RootState} from "SinglePageApp/AppBase/Store";

const mapStateToProps = (rootState: RootState): ToastsState => {
    return {
        toasts: getToasts(rootState.toaster),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToastCommandAction(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => dispatch(createToastMessageWasRemoved(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string) => dispatch(createBlockToastForMessageReceivingCommandAction(toastId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);