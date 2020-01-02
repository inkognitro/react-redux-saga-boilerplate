import React, {FunctionComponent} from 'react';
import {Message} from "App/Redux/Toaster/Message/types";
import {Message as MessageComponent} from "./Message";

function getToastClassName(type: string): string {
    let classNames = ['app-toast'];
    if(type === 'success') {
        classNames.push('app-toast-success');
    } else if(type === 'warning') {
        classNames.push('app-toast-warning');
    } else if(type === 'error') {
        classNames.push('app-toast-error');
    } else {
        classNames.push('app-toast-info');
    }
    return classNames.join(' ');
}

export type ToastProps = {
    id: string,
    messages: Message[],
    type: 'info' | 'warning' | 'error',
    onClose(toastId: string): void,
};

export const Toast: FunctionComponent<ToastProps> = (props) => {
    return (
        <div className={getToastClassName(props.type)}>
            {props.messages.map((message) => (<MessageComponent {...message} key={message.id}/>))}
        </div>
    );
};