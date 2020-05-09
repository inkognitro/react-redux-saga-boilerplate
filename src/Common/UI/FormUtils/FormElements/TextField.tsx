import React, { FC } from "react";
import { TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { ConnectedInternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";
import { ConnectedFormElementComponentProps } from "Common/UI/FormUtils/FormElements/Types";

export type TextFieldProps = ConnectedFormElementComponentProps<TextFieldState>
export const TextField: FC<TextFieldProps> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
