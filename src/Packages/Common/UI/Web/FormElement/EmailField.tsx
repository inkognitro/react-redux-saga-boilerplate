import React, { FC } from "react";
import { EmailFieldState } from "Packages/Common/Domain/FormElement/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormElement/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormElement/Types";

export type EmailFieldProps = ConnectedFormElementComponentProps<EmailFieldState>
export const EmailField: FC<EmailFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
