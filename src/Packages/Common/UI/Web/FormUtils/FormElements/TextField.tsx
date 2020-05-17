import React, { FC } from "react";
import { TextFieldState } from "Packages/Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Packages/Common/UI/Web/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Packages/Common/UI/Web/FormUtils/FormElements/Types";

export type TextFieldProps = ConnectedFormElementComponentProps<TextFieldState>
export const TextField: FC<TextFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
