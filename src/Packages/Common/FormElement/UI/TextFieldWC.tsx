import React, { FC } from "react";
import { TextFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputFieldWC } from "Packages/Common/FormElement/UI/InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "Packages/Common/FormElement/UI/Types";

export type TextFieldWCProps = ConnectedFormElementWCProps<TextFieldState>
export const TextFieldWC: FC<TextFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
