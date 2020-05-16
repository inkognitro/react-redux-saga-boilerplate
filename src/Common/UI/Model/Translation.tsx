import React, { FC } from "react";
import { TranslatorState } from "Common/Domain/Translator/Types";
import { findTranslatedText } from "Common/Domain/Translator/Query/TranslatedTextQuery";
import { Translation as TranslationData } from "Common/Domain/Model/Translation";

export type TranslationComponentState = {
    translatorState: TranslatorState,
    translationData: TranslationData,
};

export type TranslationProps = TranslationComponentState;

export const Translation: FC<TranslationProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translationData);
    if (translatedText !== null) {
        return translatedText;
    }
    if (props.translationData.fallback) {
        return props.translationData.fallback;
    }
    return props.translationData.translationId;
};
