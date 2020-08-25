import React, { FC, Fragment } from "react";
import { Translation } from "packages/entity/common-types";
import { findTranslatedText, TranslatorState } from "../../domain";
import { TranslationTextConsumer } from '../context';

type InternalTranslatedTextProps = {
    translatorState: TranslatorState
    translation: Translation
}

const InternalTranslatedText: FC<InternalTranslatedTextProps> = (props) => {
    const translatedText = findTranslatedText(props.translatorState, props.translation);
    if (translatedText !== null) {
        return (<Fragment>{translatedText}</Fragment>);
    }
    if (props.translation.fallback) {
        return (<Fragment>{props.translation.fallback}</Fragment>);
    }
    return (<Fragment>{props.translation.translationId}</Fragment>);
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
