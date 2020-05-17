import React, { FC } from "react";
import { PasswordFieldState } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormUtils/FormElements/Types";

export type PasswordFieldProps = ConnectedFormElementComponentProps<PasswordFieldState>
export const PasswordField: FC<PasswordFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
