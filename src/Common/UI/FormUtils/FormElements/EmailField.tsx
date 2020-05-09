import React, { FC } from "react";
import { EmailFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps, FormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type EmailFieldComponentProps = FormElementComponentProps<EmailFieldState>

export const EmailField: FC<EmailFieldComponentProps> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export type ConnectedEmailFieldComponentProps = ConnectedFormElementComponentProps<EmailFieldState>
export const ConnectedEmailField: FC<ConnectedEmailFieldComponentProps> = (props) => (
    <ConnectedInternalInputField getData={props.getData} />
);
