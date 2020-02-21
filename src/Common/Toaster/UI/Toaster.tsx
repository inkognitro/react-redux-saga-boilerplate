import { connect } from 'react-redux'
import {Toasts, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toasts';
import {ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";

const mapStateToProps = ({}, props: ToasterProps): ToastsState => {
    return {
        toasts: props.toastRepository.findAll(),
    };
};

const mapDispatchToProps = ({}, props: ToasterProps): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string): void => props.toastRepository.removeToast(toastId),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => props.toastRepository.removeToastMessage(toastId, toastMessageId),
        onBlockToastForMessageReceiving: (toastId: string) => props.toastRepository.blockToastForMessageReceiving(toastId),
    };
};

export type ToasterProps = {
    toastRepository: ToastRepositoryInterface,
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(Toasts);