import React, { FC } from "react";
import { PasswordFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputFieldWC } from "Packages/Common/FormElement/UI/InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "Packages/Common/FormElement/UI/Types";

export type PasswordFieldWCProps = ConnectedFormElementWCProps<PasswordFieldState>
export const PasswordFieldWC: FC<PasswordFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
