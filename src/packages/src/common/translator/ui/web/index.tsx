import React, { FC, Fragment } from 'react';
import { Translation } from 'packages/common/types/util/domain';
import { findTranslatedText } from '../../domain';
import { useTranslatorState } from '../context';

export type TranslatedTextProps = {
    translation: Translation;
};

export const TranslatedText: FC<TranslatedTextProps> = (props) => {
    const translatorState = useTranslatorState();
    const translatedText = findTranslatedText(translatorState, props.translation);
    if (translatedText !== null) {
        return <Fragment>{translatedText}</Fragment>;
    }
    if (props.translation.fallback) {
        return <Fragment>{props.translation.fallback}</Fragment>;
    }
    return <Fragment>{props.translation.translationId}</Fragment>;
};
