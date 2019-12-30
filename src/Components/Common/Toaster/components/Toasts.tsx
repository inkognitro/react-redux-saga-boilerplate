import React, {FunctionComponent} from 'react';
import {Toast, ToastProps} from './Toast';

export type ToastsProps = {
    toasts: ToastProps[],
    onCloseToast(toastId: string): void,
};

export const Toasts: FunctionComponent<ToastsProps> = (props) => {
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