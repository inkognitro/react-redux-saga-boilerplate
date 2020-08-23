import React, { FC, Fragment } from "react";
import { Translation } from "Packages/Entity/CommonTypes";
import { TranslatedTextWC } from "Packages/Common/translator/web";
import { FormElementWC } from "./FormElementWC";
import { MessagesWC } from './MessagesWC';
import { FormElementState, FormElementTypes } from "../Domain";
import { LabelWC } from "./LabelWC";

export type InputGroupWCProps = {
    formElement: FormElementState
    label?: JSX.Element,
}

export const InputGroupWC: FC<InputGroupWCProps> = (props) => {
    if (props.formElement.type === FormElementTypes.CHECKBOX) {
        return (
            <div className="input-group">
                <FormElementWC data={props.formElement} />
                {props.label}
                <div><MessagesWC messages={props.formElement.messages} /></div>
            </div>
        );
    }
    return (
        <Fragment>
            {props.label}
            <FormElementWC data={props.formElement} />
            <div><MessagesWC messages={props.formElement.messages} /></div>
        </Fragment>
    );
};

export type SimpleInputGroupWCProps = {
    formElement: FormElementState
    labelTranslation?: Translation,
}

export const SimpleInputGroupWC: FC<SimpleInputGroupWCProps> = (props) => (
    <InputGroupWC
        formElement={props.formElement}
        label={(!props.labelTranslation ? undefined : (
            <LabelWC formElementId={props.formElement.id}>
                <TranslatedTextWC translation={props.labelTranslation} />
            </LabelWC>
        ))}
    />
);
