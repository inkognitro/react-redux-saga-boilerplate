import React, {FunctionComponent} from 'react';
import {Toast} from './Toast';
import './Toasts.scss';
import {Toast as ToastData} from "App/Common/Layout/Redux/Toaster/Types";

export type ToastsProps = {
    toasts: ToastData[],
    onRemoveToast(toastId: string): void,
    onRemoveToastMessage(toastId: string, toastMessageId: string): void,
    onBlockToastForMessageReceiving(toastId: string): void,
};

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