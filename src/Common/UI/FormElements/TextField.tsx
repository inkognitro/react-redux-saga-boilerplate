import React from "react";
import { TextFieldState } from "Common/Domain/FormElements/Types";
import { InternalInputFieldFC, InternalInputField } from "Common/UI/FormElements/InternalInputField";

export const TextField: InternalInputFieldFC<TextFieldState> = (props) => (
    <InternalInputField
        data={props.data}
        onChange={props.onChange}
    />
);
