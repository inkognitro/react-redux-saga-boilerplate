import React from "react";
import { TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormUtils/FormElements/InternalInputField";

export const TextField: InternalInputFieldFC<TextFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
