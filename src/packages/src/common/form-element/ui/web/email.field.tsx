import React from "react";
import { EmailFieldState } from "../../domain";
import { ConnectedInternalInputField, InternalInputField } from "./internal.input.field";
import { ConnectedFormElementFC, FormElementFC } from "./types";

export const EmailField: FormElementFC<EmailFieldState> = (props) => (
    <InternalInputField data={props.data} onChange={props.onChange} />
);

export const ConnectedEmailField: ConnectedFormElementFC<EmailFieldState> = (props) => (
    <ConnectedInternalInputField data={props.data} />
);
