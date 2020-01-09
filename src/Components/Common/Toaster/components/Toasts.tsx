import React, {FunctionComponent} from 'react';
import {Toast} from './Toast';
import './Toasts.scss';
import {Toast as ToastData} from "App/Redux/Toaster/types";

export type ToastsProps = {
    toasts: ToastData[],
};

export const Toasts: FunctionComponent<ToastsProps> = (props) => {
    return (
        <div className="app-toasts">
            {props.toasts.map((toastData: ToastData) => (
                <Toast
                    key={toastData.id}
                    {...toastData}
                />
            ))}
        </div>
    );
};