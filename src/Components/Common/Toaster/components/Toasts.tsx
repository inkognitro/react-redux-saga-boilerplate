import React, {FunctionComponent} from 'react';
import {Toast, ToastProps} from './Toast';
import './Toasts.scss';

export type ToastsProps = {
    toasts: ToastProps[],
    onCloseToast(toastId: string): void,
};

export const Toasts: FunctionComponent<ToastsProps> = (props) => {
    return (
        <div className="app-toasts">
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