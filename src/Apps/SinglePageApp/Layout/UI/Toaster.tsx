import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toaster';
import {Dispatch} from "redux";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {createRemoveToast} from "Common/Toaster/Domain/Command/RemoveToast";
import {createBlockToastForMessageReceiving} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {createRemoveToastMessage} from "Common/Toaster/Domain/Command/RemoveToastMessage";
import {getToasts} from "Common/Toaster/Domain/Query/ToastsQuery";

const mapStateToProps = (rootState: RootState): ToastsState => {
    return {
        toasts: getToasts(rootState.toaster),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToast(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => dispatch(createRemoveToastMessage(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string) => dispatch(createBlockToastForMessageReceiving(toastId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);