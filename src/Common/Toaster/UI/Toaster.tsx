import React, {FunctionComponent} from 'react';
import {Toast} from './Toast';
import {Toast as ToastData} from "Common/Toaster/Domain/Types";
import './Toaster.scss';

export type ToasterState = {
    toasts: ToastData[],
}

export type ToasterCallbacks = {
    onRemoveMessage(messageId: string): void,
};

export type ToasterProps = (ToasterState & ToasterCallbacks);

export const Toaster: FunctionComponent<ToasterProps> = (props) => {
    return (
        <div className="app-toasts">
            {props.toasts.map((toast: ToastData) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </div>
    );
};