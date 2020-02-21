import React, {FunctionComponent} from 'react';
import {Toast} from './Toast';
import {Toast as ToastData} from "Common/Toaster/Domain/ToastRepository";
import './Toasts.scss';

export type ToastsState = {
    toasts: ToastData[],
}

export type ToastsCallbacks = {
    onRemoveToast(toastId: string): void,
    onRemoveToastMessage(toastId: string, toastMessageId: string): void,
    onBlockToastForMessageReceiving(toastId: string): void,
};

export type ToastsProps = (ToastsState & ToastsCallbacks);

export const Toasts: FunctionComponent<ToastsProps> = (props) => {
    return (
        <div className="app-toasts">
            {props.toasts.map((toastData: ToastData) => (
                <Toast
                    {...toastData}
                    key={toastData.id}
                    onRemove={() => props.onRemoveToast(toastData.id)}
                    onRemoveMessage={(messageId: string) => props.onRemoveToastMessage(toastData.id, messageId)}
                    onBlockMessageReceiving={() => props.onBlockToastForMessageReceiving(toastData.id)}
                />
            ))}
        </div>
    );
};