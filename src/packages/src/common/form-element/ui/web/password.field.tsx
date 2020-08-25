import React from "react";
import { PasswordFieldState } from "../../domain";
import { InternalInputField, ConnectedInternalInputField } from "./internal.input.field";
import { FormElementFC, ConnectedFormElementFC } from "./types";

export const PasswordField: FormElementFC<PasswordFieldState> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export const ConncectedPasswordField: ConnectedFormElementFC<PasswordFieldState> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
