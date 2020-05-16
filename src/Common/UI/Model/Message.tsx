import React, { FC } from "react";
import { Message as MessageData } from "Common/Domain/Model/Message";
import { TranslatorState } from "Common/Domain/Translator/Types";
import { Translation } from "Common/UI/Model/Translation";

export type MessageComponentState = {
    getTranslatorState: () => TranslatorState,
    messageData: MessageData;
};

export type MessageProps = MessageComponentState;

export const Message: FC<MessageProps> = (props) => {
    if (!props.messageData.content.translation) {
        return props.messageData.content.defaultText;
    }
    return (
        <Translation
            getTranslatorState={props.getTranslatorState}
            translationData={props.messageData.content.translation}
            translationFallback={props.messageData.content.defaultText}
        />
    );
};
