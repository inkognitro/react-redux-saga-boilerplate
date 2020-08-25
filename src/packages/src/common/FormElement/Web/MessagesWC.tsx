import React, { FC, Fragment } from "react";
import { IconSizes, IconTypes, ErrorIconWC } from "packages/common/Icon/Web";
import { Message as MessageData, MessageTypes } from "packages/entity/common-types";
import { TranslatedText } from "packages/common/translator/ui/web";

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
                    <TranslatedText translation={props.message.content} />
                </small>
            </Fragment>
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
