import React, { FC, Fragment } from "react";
import { Translation } from "packages/entity/common-types";
import { TranslatedText } from "packages/common/translator/ui/web";
import { FormElement } from "./form.element";
import { Messages } from './messages';
import { FormElementState, FormElementTypes } from "../../domain";
import { Label } from "./label";

export type InputGroupProps = {
    formElement: FormElementState
    label?: JSX.Element,
}

export const InputGroup: FC<InputGroupProps> = (props) => {
    if (props.formElement.type === FormElementTypes.CHECKBOX) {
        return (
            <div className="input-group">
                <FormElement data={props.formElement} />
                {props.label}
                <div><Messages messages={props.formElement.messages} /></div>
            </div>
        );
    }
    return (
        <Fragment>
            {props.label}
            <FormElement data={props.formElement} />
            <div><Messages messages={props.formElement.messages} /></div>
        </Fragment>
    );
};

export type SimpleInputGroupProps = {
    formElement: FormElementState
    labelTranslation?: Translation,
}

export const SimpleInputGroup: FC<SimpleInputGroupProps> = (props) => (
    <InputGroup
        formElement={props.formElement}
        label={(!props.labelTranslation ? undefined : (
            <Label formElementId={props.formElement.id}>
                <TranslatedText translation={props.labelTranslation} />
            </Label>
        ))}
    />
);
