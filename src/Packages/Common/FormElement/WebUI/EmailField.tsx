import React, { FC } from "react";
import { EmailFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputField } from "Packages/Common/FormElement/WebUI/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/FormElement/WebUI/Types";

export type EmailFieldProps = ConnectedFormElementComponentProps<EmailFieldState>
export const EmailField: FC<EmailFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
