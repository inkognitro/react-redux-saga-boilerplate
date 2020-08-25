import React, { FC } from "react";
import { Text } from 'react-native';
import { Translation } from 'packages/entity/common-types';
import { findTranslatedText, TranslatorState } from "../../domain";
import { TranslationTextConsumer } from '../context';

type InternalTranslatedTextProps = {
    translatorState: TranslatorState
    translation: Translation
}

const InternalTranslatedText: FC<InternalTranslatedTextProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translation);
    if (translatedText !== null) {
        return (<Text>{translatedText}</Text>);
    }
    if (props.translation.fallback) {
        return (<Text>{props.translation.fallback}</Text>);
    }
    return (<Text>{props.translation.translationId}</Text>);
};

export type TranslatedTextProps = {
    translation: Translation
}

export const TranslatedText: FC<TranslatedTextProps> = (props) => (
    <TranslationTextConsumer>
        {(translatorState: TranslatorState) => (
            <InternalTranslatedText
                translatorState={translatorState}
                translation={props.translation}
            />
        )}
    </TranslationTextConsumer>
);
