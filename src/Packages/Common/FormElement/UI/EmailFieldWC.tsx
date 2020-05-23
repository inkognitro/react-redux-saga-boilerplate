import React, { FC } from "react";
import { EmailFieldState } from "Packages/Common/FormElement";
import { ConnectedInternalInputFieldWC } from "./InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "./Types";

export type EmailFieldWCProps = ConnectedFormElementWCProps<EmailFieldState>
export const EmailFieldWC: FC<EmailFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
