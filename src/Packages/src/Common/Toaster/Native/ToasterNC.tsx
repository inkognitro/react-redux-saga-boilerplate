import React, { FC, Fragment } from 'react';
import { Text } from 'react-native';
import { Toast } from "Packages/Common/Toaster/Domain";

export type ToasterWCState = {
    toasts: Toast[]
};

export type ToasterWCCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterWCState & ToasterWCCallbacks;

export const ToasterNC: FC<ToasterProps> = (props) => (
    <>
        {props.toasts.map((toast) => (
            <Fragment key={toast.id}>
                {toast.messages.map((message) => (
                    <Text key={message.id}>{message.content.fallback}</Text>
                ))}
            </Fragment>
        ))}
    </>
);
