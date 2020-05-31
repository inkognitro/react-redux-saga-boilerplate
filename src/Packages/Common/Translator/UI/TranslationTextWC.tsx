import React, { FC } from "react";
import { findTranslatedText, TranslatorState } from "Packages/Common/Translator";
import { Translation } from "Packages/Common/CommonTypes";

export type TranslationTextWCState = {
    translatorState: TranslatorState
    translation: Translation
}

export type TranslationTextWCProps = TranslationTextWCState;

export const TranslationTextWC: FC<TranslationTextWCProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translation);
    if (translatedText !== null) {
        return (<React.Fragment>{translatedText}</React.Fragment>);
    }
    if (props.translation.fallback) {
        return (<React.Fragment>{props.translation.fallback}</React.Fragment>);
    }
    return (<React.Fragment>{props.translation.translationId}</React.Fragment>);
};
