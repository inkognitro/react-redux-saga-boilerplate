import React, { FC } from "react";
import { ErrorIconWC } from "Packages/Common/Icon/UI/ErrorIconWC";
import { IconSizes, IconTypes } from "Packages/Common/Icon/UI/IconWC";
import { Message as MessageData, MessageTypes } from "Packages/Common/CommonTypes";

export type MessageWCProps = {
    message: MessageData;
};

const Message: FC<MessageWCProps> = (props) => { // todo: message content should be TranslatedText (after integration via context)
    if (props.message.type === MessageTypes.ERROR) {
        return (
            <small className="text-danger">
                <ErrorIconWC size={IconSizes.XS} type={IconTypes.ERROR} />
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

export const MessagesWC: FC<MessagesProps> = (props) => {
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
