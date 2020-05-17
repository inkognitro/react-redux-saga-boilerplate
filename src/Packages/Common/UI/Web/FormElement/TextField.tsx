import React, { FC } from "react";
import { TextFieldState } from "Packages/Common/Domain/FormElement/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormElement/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormElement/Types";

export type TextFieldProps = ConnectedFormElementComponentProps<TextFieldState>
export const TextField: FC<TextFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
