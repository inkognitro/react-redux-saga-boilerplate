import React, { FC } from "react";
import { TranslatorState } from "Packages/Common/Domain/Translator/Types";
import { findTranslatedText } from "Packages/Common/Domain/Translator/Query/TranslatedTextQuery";
import { Translation as TranslationData } from "Packages/Common/Domain/Model/Translation";

export type TranslationComponentState = {
    translatorState: TranslatorState
    translationData: TranslationData
}

export type TranslationProps = TranslationComponentState;

export const Translation: FC<TranslationProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translationData);
    if (translatedText !== null) {
        return (<React.Fragment>{translatedText}</React.Fragment>);
    }
    if (props.translationData.fallback) {
        return (<React.Fragment>{props.translationData.fallback}</React.Fragment>);
    }
    return (<React.Fragment>{props.translationData.translationId}</React.Fragment>);
};
