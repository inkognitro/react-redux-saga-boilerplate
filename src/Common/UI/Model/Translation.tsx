import React, { FC } from "react";
import { TranslatorState } from "Common/Domain/Translator/Types";
import { findTranslatedText } from "Common/Domain/Translator/Query/TranslatedTextQuery";
import { Translation as TranslationData } from "Common/Domain/Model/Translation";

export type TranslationComponentState = {
    getTranslatorState: () => TranslatorState
    translationData: TranslationData,
    translationFallback?: string,
};

export type TranslationProps = TranslationComponentState;

export const Translation: FC<TranslationProps> = (props) => {
    const translatedText = findTranslatedText(props.getTranslatorState(), props.translationData);
    if (translatedText === null && props.translationFallback) {
        return props.translationFallback;
    }
    if (translatedText === null) {
        return props.translationData.translationId;
    }
    return translatedText;
};
