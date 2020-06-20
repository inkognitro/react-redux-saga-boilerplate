import React, { FC } from 'react';
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
            <>
                {toast.messages.map((message) => (
                    <Text>{message.content.fallback}</Text>
                ))}
            </>
        ))}
    </>
);
