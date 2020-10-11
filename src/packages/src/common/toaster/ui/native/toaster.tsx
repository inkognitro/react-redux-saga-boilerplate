import React, { FC } from 'react';
import { Text } from 'react-native';
import { Message } from "packages/common/toaster/domain/types";
import { Toast as ToastData } from "../../domain";

export type ToasterProps = { toasts: ToastData[] }

function renderMessageContent(message: Message): string | undefined {
    if (typeof message.content === 'string') {
        return message.content;
    }
    return message.content.fallback;
}

export const Toaster: FC<ToasterProps> = (props) => (
    <>
        {props.toasts.map((toast) => toast.messages.map((message) => (
            <Text key={message.id}>{renderMessageContent(message)}</Text>
        )))}
    </>
);
