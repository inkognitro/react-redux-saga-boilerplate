import React, { FC, ReactNode } from "react";
import { Translation } from "packages/common/types/util/domain";
import { TranslatedText } from "packages/common/translator/ui/web";
import { FormElementState, FormElementTypes } from "../../domain";
import { Checkbox } from "./input.checkbox";
import { TextField, PasswordField, EmailField } from "./input.text.field";
import { Label } from "./label";

type FormElementProps = {
    data: FormElementState
    label?: ReactNode
}

export const FormElement: FC<FormElementProps> = (props) => {
    if (props.data.type === FormElementTypes.TEXT) {
        return (<TextField data={props.data} label={props.label} />);
    }
    if (props.data.type === FormElementTypes.PASSWORD) {
        return (<PasswordField data={props.data} label={props.label} />);
    }
    if (props.data.type === FormElementTypes.EMAIL) {
        return (<EmailField data={props.data} label={props.label} />);
    }
    if (props.data.type === FormElementTypes.CHECKBOX) {
        return (<Checkbox data={props.data} label={props.label} />);
    }
    console.error('form element not supported: ', props);
    throw new Error(`form element not supported`);
};

type SimpleFormElementProps = {
    data: FormElementState
    label?: Translation
}

export const SimpleFormElement: FC<SimpleFormElementProps> = (props) => {
    const label = (!props.label ? undefined : (
        <Label for={props.data.id} isRequired={props.data.isRequired}>
            <TranslatedText translation={props.label} />
        </Label>
    ));
    return (<FormElement data={props.data} label={label} />);
};
