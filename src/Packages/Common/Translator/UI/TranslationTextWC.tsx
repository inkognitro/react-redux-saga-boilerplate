import React, { FC } from "react";
import { TranslatorState } from "Packages/Common/Translator/Domain/Types";
import { findTranslatedText } from "Packages/Common/Translator/Domain/Query/TranslatedTextQuery";
import { Translation } from "Packages/Common/Types";

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
