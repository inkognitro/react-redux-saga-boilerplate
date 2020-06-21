import React, { FC } from "react";
import { Translation } from "Packages/Entity/CommonTypes";
import { TranslatedTextWC } from "Packages/Common/Translator/Web";

export type LabelWCProps = {
    formElementId?: string
};

export const LabelWC: FC<LabelWCProps> = (props) => (
    <label htmlFor={props.formElementId}>
        {props.children}
    </label>
);

export type TranslationLabelWCProps = {
    translation: Translation
    formElementId?: string
};

export const TranslationLabelWC: FC<TranslationLabelWCProps> = (props) => (
    <LabelWC formElementId={props.formElementId}>
        <TranslatedTextWC translation={props.translation} />
    </LabelWC>
);
