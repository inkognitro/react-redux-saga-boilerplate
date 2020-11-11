import React, { FC } from 'react';
import { IconSizes, IconTypes, ErrorIcon } from 'packages/common/icon/ui/web';
import { Message as MessageData, MessageTypes } from 'packages/common/types/util/domain';
import { TranslatedText } from 'packages/common/translator/ui/web';

type MessageProps = {
    message: MessageData;
};

const Message: FC<MessageProps> = (props) => {
    if (props.message.type === MessageTypes.ERROR) {
        return (
            <>
                <ErrorIcon size={IconSizes.XS} type={IconTypes.ERROR} />{' '}
                <small className="text-danger">
                    <TranslatedText translation={props.message.content} />
                </small>
            </>
        );
    }
    return (
        <small className="text-info">
            <TranslatedText translation={props.message.content} />
        </small>
    );
};

export type MessagesProps = {
    messages: MessageData[];
};

export const Messages: FC<MessagesProps> = (props) => {
    if (props.messages.length === 0) {
        return null;
    }
    return (
        <>
            {props.messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </>
    );
};
