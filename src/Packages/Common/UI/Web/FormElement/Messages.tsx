import React, { FC } from "react";
import { ErrorIcon } from "Packages/Common/UI/Web/Icon/ErrorIcon";
import { IconSizes, IconTypes } from "Packages/Common/UI/Web/Icon/Icon";
import {Message, MessageTypes} from "Packages/Common/Domain/Types";

export type MessageProps = {
    message: MessageData;
};

const Message: FC<MessageProps> = (props) => { // todo: message content should be TranslatedText (after integration via context)
    if (props.message.type === MessageTypes.ERROR) {
        return (
            <small className="text-danger">
                <ErrorIcon size={IconSizes.XS} type={IconTypes.ERROR} />
                {" "}
                {props.message.content}
            </small>
        );
    }
    return <small className="text-info">{props.message.content}</small>;
};

export type MessagesProps = {
    messages: MessageData[];
};

export const Messages: FC<MessagesProps> = (props) => {
    if (props.messages.length === 0) {
        return null;
    }
    return (
        <React.Fragment>
            {props.messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </React.Fragment>
    );
};
