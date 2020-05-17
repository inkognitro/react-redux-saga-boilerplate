import React, { FC } from "react";
import { EmailFieldState } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormUtils/FormElements/Types";

export type EmailFieldProps = ConnectedFormElementComponentProps<EmailFieldState>
export const EmailField: FC<EmailFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
