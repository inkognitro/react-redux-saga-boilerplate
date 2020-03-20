import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toaster';
import {Dispatch} from "redux";
import {createRemoveToastAction} from "Common/Toaster/Domain/Command/RemoveToast";
import {getToasts} from "Common/Toaster/Domain/Query";
import {createBlockToastForMessageReceivingAction} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {RootState} from "../../AppBase/Store";
import {createRemoveToastMessageAction} from "Common/Toaster/Domain/Command/RemoveToastMessage";

const mapStateToProps = (rootState: RootState): ToastsState => {
    return {
        toasts: getToasts(rootState.toaster),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToastAction(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => dispatch(createRemoveToastMessageAction(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string) => dispatch(createBlockToastForMessageReceivingAction(toastId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);