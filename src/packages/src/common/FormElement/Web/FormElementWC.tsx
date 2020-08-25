import React, { FC } from "react";
import { FormElementState, FormElementTypes } from "../Domain";
import { ConncectedCheckboxWC } from "./CheckboxWC";
import { ConncectedPasswordFieldWC } from "./PasswordFieldWC";
import { ConnectedEmailFieldWC } from "./EmailFieldWC";
import { ConnectedTextFieldWC } from "./TextFieldWC";

type FormElementWCProps = {
    data: FormElementState
}

export const FormElementWC: FC<FormElementWCProps> = (props) => {
    if (props.data.type === FormElementTypes.CHECKBOX) {
        return (<ConncectedCheckboxWC data={props.data} />);
    }
    if (props.data.type === FormElementTypes.PASSWORD) {
        return (<ConncectedPasswordFieldWC data={props.data} />);
    }
    if (props.data.type === FormElementTypes.EMAIL) {
        return (<ConnectedEmailFieldWC data={props.data} />);
    }
    if (props.data.type === FormElementTypes.TEXT) {
        return (<ConnectedTextFieldWC data={props.data} />);
    }
    throw new Error('Data not supported');
};
