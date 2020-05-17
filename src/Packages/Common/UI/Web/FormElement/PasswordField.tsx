import React, { FC } from "react";
import { PasswordFieldState } from "Packages/Common/Domain/FormElement/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormElement/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormElement/Types";

export type PasswordFieldProps = ConnectedFormElementComponentProps<PasswordFieldState>
export const PasswordField: FC<PasswordFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
