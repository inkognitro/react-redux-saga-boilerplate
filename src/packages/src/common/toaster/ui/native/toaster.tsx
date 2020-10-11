import React, { FC } from 'react';
import { Text } from 'react-native';
import { Toast as ToastData } from "../../domain";

export type ToasterProps = { toasts: ToastData[] }

export const Toaster: FC<ToasterProps> = (props) => {
    return (
        <>
            {props.toasts.map((toast) => toast.messages.map((message) => (
                <Text key={message.id}>{message.content.fallback}</Text>
            )))}
        </>
    );
};
