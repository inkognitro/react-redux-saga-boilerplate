import React from "react";
import { PasswordFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";

export const PasswordField: InternalInputFieldFC<PasswordFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
