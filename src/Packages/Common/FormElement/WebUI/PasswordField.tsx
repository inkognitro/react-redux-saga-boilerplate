import React, { FC } from "react";
import { PasswordFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputField } from "Packages/Common/FormElement/WebUI/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/FormElement/WebUI/Types";

export type PasswordFieldProps = ConnectedFormElementComponentProps<PasswordFieldState>
export const PasswordField: FC<PasswordFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
