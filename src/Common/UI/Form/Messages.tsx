import React, {FC} from 'react';
import {Message, MessageTypes} from "Common/Domain/Form/Element/Types";
import {ErrorIcon} from "Common/UI/Base/Icon/ErrorIcon";
import {IconSizes, IconTypes} from "Common/UI/Base/Icon/Icon";

export type MessageProps = {
    message: Message,
};

const Message: FC<MessageProps> = (props) => {
    if(props.message.type === MessageTypes.ERROR) {
        return (
            <small className="text-danger">
                <ErrorIcon size={IconSizes.XS} type={IconTypes.ERROR} /> {props.message.content}
            </small>
        );
    }
    return (
        <small className="text-info">
            {props.message.content}
        </small>
    );
};

export type MessagesProps = {
    messages: Message[],
};

export const Messages: FC<MessagesProps> = (props) => {
    if(props.messages.length === 0) {
        return null;
    }
    return (
        <React.Fragment>
            {props.messages.map((message) => (<Message key={message.id} message={message} />))}
        </React.Fragment>
    );
};