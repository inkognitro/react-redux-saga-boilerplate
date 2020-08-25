import React from "react";
import { PasswordFieldState } from "../Domain";
import { InternalInputFieldWC, ConnectedInternalInputFieldWC } from "./InternalInputFieldWC";
import { FormElementFC, ConnectedFormElementFC } from "./Types";

export const PasswordFieldWC: FormElementFC<PasswordFieldState> = (props) => (
    <InternalInputFieldWC data={props.data} onChange={props.onChange} />
);

export const ConncectedPasswordFieldWC: ConnectedFormElementFC<PasswordFieldState> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
