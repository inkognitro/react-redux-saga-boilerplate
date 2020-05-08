import React from "react";
import { PasswordFieldState } from "Common/Domain/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormElements/InternalInputField";

export const PasswordField: InternalInputFieldFC<PasswordFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
