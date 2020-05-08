import React, { FC } from "react";
import { FormElementTypes, InputFieldState } from "Common/Domain/FormElements/Types";
import { Messages } from "Common/UI/Form/Messages";

function createHtmlInputTypeByTextFieldType(type: FormElementTypes): string {
    if (type === FormElementTypes.TEXT) {
        return "text";
    }
    if (type === FormElementTypes.PASSWORD) {
        return "password";
    }
    if (type === FormElementTypes.EMAIL) {
        return "email";
    }
    throw new Error(`Form element type "${type}" not supported!`);
}

export type DumbInputFieldState = {
  data: InputFieldState,
};

export type DumbInputFieldCallbacks = {
  onChange(state: InputFieldState, stateChanges: Partial<InputFieldState>): void;
};

export type DumbInputFieldProps = (DumbInputFieldCallbacks & DumbInputFieldState);

export const DumbInputField: FC<DumbInputFieldProps> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data, {
                value: event.target.value,
            });
        };
    return (
        <React.Fragment>
            <input
                id={props.data.id}
                className="form-control"
                type={createHtmlInputTypeByTextFieldType(props.data.type)}
                value={props.data.value}
                onChange={onChange}
                readOnly={props.data.readOnly}
            />
            <Messages messages={props.data.messages} />
        </React.Fragment>
    );
};
