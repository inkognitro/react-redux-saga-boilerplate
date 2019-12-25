import React, {FunctionComponent} from 'react';
import {Toast, ToastProps} from './Toast';

export type ToasterProps = {
    toasts: Array<ToastProps>,
    onCloseToast(toastId: string): void,
};

export const Toasts: FunctionComponent<ToasterProps> = (props) => {
    return (
        <div>
            {props.toasts.map((toastProps) => (
                <Toast
                    key={toastProps.id}
                    onClose={(toastId) => props.onCloseToast(toastId)}
                    {...toastProps}
                />
            ))}
        </div>
    );
};