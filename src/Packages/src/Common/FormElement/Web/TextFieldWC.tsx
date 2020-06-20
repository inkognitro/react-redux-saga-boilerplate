import React, { FC } from "react";
import { TextFieldState } from "../Domain";
import { ConnectedInternalInputFieldWC } from "./InternalInputFieldWC";
import { ConnectedFormElementWCProps } from "./Types";

export type TextFieldWCProps = ConnectedFormElementWCProps<TextFieldState>
export const TextFieldWC: FC<TextFieldWCProps> = (props) => (
    <ConnectedInternalInputFieldWC data={props.data} />
);