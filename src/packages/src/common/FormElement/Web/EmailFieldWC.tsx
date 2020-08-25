import React from "react";
import { EmailFieldState } from "../Domain";
import { ConnectedInternalInputFieldWC, InternalInputFieldWC } from "./InternalInputFieldWC";
import { ConnectedFormElementFC, FormElementFC } from "./Types";

export const EmailFieldWC: FormElementFC<EmailFieldState> = (props) => (
    <InternalInputFieldWC data={props.data} onChange={props.onChange} />
);

export const ConnectedEmailFieldWC: ConnectedFormElementFC<EmailFieldState> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);
