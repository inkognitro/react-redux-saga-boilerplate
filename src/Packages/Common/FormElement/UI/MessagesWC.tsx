import React, { FC } from "react";
import { IconSizes, IconTypes, ErrorIconWC } from "Packages/Common/Icon";
import { Message as MessageData, MessageTypes } from "Packages/Common/CommonTypes";
import { TranslatedTextWC } from "Packages/Common/Translator";

export type MessageWCProps = {
    message: MessageData;
};

const Message: FC<MessageWCProps> = (props) => {
    if (props.message.type === MessageTypes.ERROR) {
        return (
            <small className="text-danger">
                <ErrorIconWC size={IconSizes.XS} type={IconTypes.ERROR} />
                {" "}
                <TranslatedTextWC translation={props.message.content} />
            </small>
        );
    }
    return (
        <small className="text-info">
            <TranslatedTextWC translation={props.message.content} />
        </small>
    );
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
