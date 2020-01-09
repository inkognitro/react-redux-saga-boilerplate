import React, {FunctionComponent} from 'react';
import {Message} from "./Message";
import {Toast as ToastData} from "App/Redux/Toaster/types";
import {Message as MessageData} from "App/Redux/Toaster/types";

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

export type ToastProps = (ToastData & {
    //onRemove(): void,
    //onRemoveMessage(messageId: string): void,
});

export const Toast: FunctionComponent<ToastProps> = (props) => {
    return (
        <div className={getToastClassName(props.type)}>
            {props.messages.map((messageData: MessageData) => (
                <Message
                    key={messageData.id}
                    {...messageData}
                />
            ))}
        </div>
    );
};