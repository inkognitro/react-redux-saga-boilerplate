import React, { FC } from "react";
import { EmailFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type EmailFieldProps = ConnectedFormElementComponentProps<EmailFieldState>
export const EmailField: FC<EmailFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
