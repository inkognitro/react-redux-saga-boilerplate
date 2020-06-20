import React, { FC } from "react";
import { Text } from 'react-native';
import { Translation } from "Packages/Entity/CommonTypes";
import { findTranslatedText, TranslatorState } from "../Domain";
import { TranslationTextConsumer } from '../TranslatorContext';

type InternalTranslatedTextWCProps = {
    translatorState: TranslatorState
    translation: Translation
}

const InternalTranslatedTextNC: FC<InternalTranslatedTextWCProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translation);
    if (translatedText !== null) {
        return (<Text>{translatedText}</Text>);
    }
    if (props.translation.fallback) {
        return (<Text>{props.translation.fallback}</Text>);
    }
    return (<Text>{props.translation.translationId}</Text>);
};

export type TranslatedTextWCProps = {
    translation: Translation
}

export const TranslatedTextNC: FC<TranslatedTextWCProps> = (props) => (
    <TranslationTextConsumer>
        {(translatorState: TranslatorState) => (
            <InternalTranslatedTextNC
                translatorState={translatorState}
                translation={props.translation}
            />
        )}
    </TranslationTextConsumer>
);
