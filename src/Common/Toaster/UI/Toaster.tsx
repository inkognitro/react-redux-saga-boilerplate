import { connect } from 'react-redux'
import {Toasts, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toasts';
import {ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";
import {Dispatch} from "redux";
import {createRemoveToastAction} from "Common/Toaster/Application/Command/RemoveToast";
import {getToasts} from "Common/Toaster/Application/Query";
import {ToasterState} from "Common/Toaster/Domain/Types";

type ToasterStateByRootStateSelector<RootState> = (rootState: RootState) => ToasterState;

const mapStateToProps<RootState> = (rootState: RootState, props: {getToasterStateFromRootState: ToasterStateByRootStateSelector<RootState>}): ToastsState => {
    return {
        toasts: getToasts(props.getToasterStateFromRootState(rootState)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToastAction(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => props.toastRepository.removeToastMessage(toastId, toastMessageId),
        onBlockToastForMessageReceiving: (toastId: string) => props.toastRepository.blockToastForMessageReceiving(toastId),
    };
};

export type ToasterProps = {
    toastRepository: ToastRepositoryInterface,
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(Toasts);