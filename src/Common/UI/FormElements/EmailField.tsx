import React from "react";
import { EmailFieldState } from "Common/Domain/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormElements/InternalInputField";

export const EmailField: InternalInputFieldFC<EmailFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
