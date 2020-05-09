import React, { FC } from "react";
import { TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps, FormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type TextFieldComponentProps = FormElementComponentProps<TextFieldState>

export const TextField: FC<TextFieldComponentProps> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export type ConnectedTextFieldComponentProps = ConnectedFormElementComponentProps<TextFieldState>
export const ConnectedTextField: FC<ConnectedTextFieldComponentProps> = (props) => (
    <ConnectedInternalInputField getData={props.getData} />
);
