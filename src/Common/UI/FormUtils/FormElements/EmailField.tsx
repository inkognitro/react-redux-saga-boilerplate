import React from "react";
import { EmailFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";

export const EmailField: InternalInputFieldFC<EmailFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
