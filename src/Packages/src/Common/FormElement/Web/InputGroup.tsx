import React, { FC, Fragment } from "react";
import { Translation } from "Packages/Entity/CommonTypes";
import { FormElementWC } from "./FormElementWC";
import { MessagesWC } from './MessagesWC';
import { FormElementState, FormElementTypes } from "../Domain";
import { TranslationLabelWC } from "./LabelWC";

export type InputGroupWCProps = {
    formElement: FormElementState
    label?: JSX.Element,
}

export const InputGroupWC: FC<InputGroupWCProps> = (props) => {
    if (props.formElement.type === FormElementTypes.CHECKBOX) {
        return (
            <Fragment>
                <FormElementWC data={props.formElement} />
                {props.label}
                <div><MessagesWC messages={props.formElement.messages} /></div>
            </Fragment>
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
        label={(props.labelTranslation
            ? <TranslationLabelWC formElementId={props.formElement.id} translation={props.labelTranslation} />
            : undefined
        )}
    />
);
