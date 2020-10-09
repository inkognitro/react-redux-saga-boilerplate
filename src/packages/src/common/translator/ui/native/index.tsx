import React, { FC } from "react";
import { Text } from 'react-native';
import { Translation } from 'packages/common/entity-base/common-types';
import { findTranslatedText } from "../../domain";
import { useTranslatorState } from '../context';

export type TranslatedTextProps = {
    translation: Translation
}

export const TranslatedText: FC<TranslatedTextProps> = (props) => {
    const translatorState = useTranslatorState();
    const translatedText = findTranslatedText(translatorState, props.translation);
    if (translatedText !== null) {
        return (<Text>{translatedText}</Text>);
    }
    if (props.translation.fallback) {
        return (<Text>{props.translation.fallback}</Text>);
    }
    return (<Text>{props.translation.translationId}</Text>);
};
