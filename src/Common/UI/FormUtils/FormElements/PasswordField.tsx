import React, { FC } from "react";
import { PasswordFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type PasswordFieldProps = ConnectedFormElementComponentProps<PasswordFieldState>
export const PasswordField: FC<PasswordFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
