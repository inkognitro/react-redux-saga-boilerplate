import React, { FC } from "react";
import { FormElementTypes, InputFieldState as InputFieldData } from "Common/Domain/FormUtils/FormElements/Types";
import { Messages } from "Common/UI/FormUtils/FormElements/Messages";

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

type InputFieldState<SpecificInputFieldState> = {
  data: SpecificInputFieldState,
};

type InputFieldCallbacks<SpecificInputFieldState> = {
  onChange(state: SpecificInputFieldState, stateChanges: Partial<SpecificInputFieldState>): void;
};

type InternalInputFieldProps<State> = (
    InputFieldCallbacks<(State & InputFieldData)>
    & InputFieldState<(State & InputFieldData)>
);

export type InternalInputFieldFC<State = {}> = FC<InternalInputFieldProps<State>>

export const InternalInputField: InternalInputFieldFC = (props) => {
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
