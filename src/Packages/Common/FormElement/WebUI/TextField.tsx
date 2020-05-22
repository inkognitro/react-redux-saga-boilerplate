import React, { FC } from "react";
import { TextFieldState } from "Packages/Common/FormElement/Domain/Types";
import { ConnectedInternalInputField } from "Packages/Common/FormElement/WebUI/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/FormElement/WebUI/Types";

export type TextFieldProps = ConnectedFormElementComponentProps<TextFieldState>
export const TextField: FC<TextFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
