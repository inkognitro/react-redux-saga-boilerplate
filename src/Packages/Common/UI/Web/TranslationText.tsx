import React, { FC } from "react";
import { TranslatorState } from "Packages/Common/Domain/Translator/Types";
import { findTranslatedText } from "Packages/Common/Domain/Translator/Query/TranslatedTextQuery";
import {Translation} from "Packages/Common/Domain/Types";

export type TranslationComponentState = {
    translatorState: TranslatorState
    translation: TranslationData
}

export type TranslationTextProps = TranslationComponentState;

export const TranslationText: FC<TranslationTextProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translation);
    if (translatedText !== null) {
        return (<React.Fragment>{translatedText}</React.Fragment>);
    }
    if (props.translation.fallback) {
        return (<React.Fragment>{props.translation.fallback}</React.Fragment>);
    }
    return (<React.Fragment>{props.translation.translationId}</React.Fragment>);
};
