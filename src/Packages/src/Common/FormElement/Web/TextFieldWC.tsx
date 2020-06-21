import React from "react";
import { TextFieldState } from "../Domain";
import { ConnectedInternalInputFieldWC, InternalInputFieldWC } from "./InternalInputFieldWC";
import { FormElementFC, ConnectedFormElementFC } from "./Types";

export const TextFieldWC: FormElementFC<TextFieldState> = (props) => (
    <InternalInputFieldWC data={props.data} onChange={props.onChange} />
);

export const ConnectedTextFieldWC: ConnectedFormElementFC<TextFieldState> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
