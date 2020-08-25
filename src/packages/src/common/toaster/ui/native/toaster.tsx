import React, { FC, Fragment } from 'react';
import { Text } from 'react-native';
import { Toast } from "../../domain";

export type ToasterState = {
    toasts: Toast[]
};

export type ToasterCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterState & ToasterCallbacks;

export const Toaster: FC<ToasterProps> = (props) => (
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
