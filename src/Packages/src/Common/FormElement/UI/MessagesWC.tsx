import React, { FC, Fragment } from "react";
import { IconSizes, IconTypes, ErrorIconWC } from "Packages/Common/Icon";
import { Message as MessageData, MessageTypes } from "Packages/Entity/CommonTypes";
import { TranslatedTextWC } from "Packages/Common/Translator";

export type MessageWCProps = {
    message: MessageData;
};

const Message: FC<MessageWCProps> = (props) => {
    if (props.message.type === MessageTypes.ERROR) {
        return (
            <Fragment>
                <ErrorIconWC size={IconSizes.XS} type={IconTypes.ERROR} />
                {' '}
                <small className="text-danger">
                    <TranslatedTextWC translation={props.message.content} />
                </small>
            </Fragment>
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
