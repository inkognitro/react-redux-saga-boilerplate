import React, { FC } from "react";
import { PasswordFieldState } from "Packages/Common/FormElement";
import { ConnectedInternalInputFieldWC } from "./InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "./Types";

export type PasswordFieldWCProps = ConnectedFormElementWCProps<PasswordFieldState>
export const PasswordFieldWC: FC<PasswordFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
