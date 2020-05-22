import React, { FC } from "react";
import { EmailFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputFieldWC } from "Packages/Common/FormElement/UI/InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "Packages/Common/FormElement/UI/Types";

export type EmailFieldWCProps = ConnectedFormElementWCProps<EmailFieldState>
export const EmailFieldWC: FC<EmailFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
