import React, { FC } from "react";
import { PasswordFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps, FormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type PasswordFieldComponentProps = FormElementComponentProps<PasswordFieldState>

export const PasswordField: FC<PasswordFieldComponentProps> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export type ConnectedPasswordFieldComponentProps = ConnectedFormElementComponentProps<PasswordFieldState>
export const ConnectedPasswordField: FC<ConnectedPasswordFieldComponentProps> = (props) => (
    <ConnectedInternalInputField getData={props.getData} />
);
