import React, { FC } from "react";
import { FormElementState, FormElementTypes } from "../../domain";
import { ConncectedCheckbox } from "./checkbox";
import { ConncectedPasswordField } from "./password.field";
import { ConnectedEmailField } from "./email.field";
import { ConnectedTextField } from "./text.field";

type FormElementProps = {
    data: FormElementState
}

export const FormElement: FC<FormElementProps> = (props) => {
    if (props.data.type === FormElementTypes.CHECKBOX) {
        return (<ConncectedCheckbox data={props.data} />);
    }
    if (props.data.type === FormElementTypes.PASSWORD) {
        return (<ConncectedPasswordField data={props.data} />);
    }
    if (props.data.type === FormElementTypes.EMAIL) {
        return (<ConnectedEmailField data={props.data} />);
    }
    if (props.data.type === FormElementTypes.TEXT) {
        return (<ConnectedTextField data={props.data} />);
    }
    throw new Error('Data not supported');
};
