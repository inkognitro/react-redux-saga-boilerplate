import React from "react";
import { TextFieldState } from "../../domain";
import { ConnectedInternalInputField, InternalInputField } from "./internal.input.field";
import { FormElementFC, ConnectedFormElementFC } from "./types";

export const TextField: FormElementFC<TextFieldState> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export const ConnectedTextField: ConnectedFormElementFC<TextFieldState> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
