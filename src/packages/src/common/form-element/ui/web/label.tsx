import React, { FC } from "react";

export type LabelProps = {
    formElementId?: string
};

export const Label: FC<LabelProps> = (props) => (
    <label htmlFor={props.formElementId}>
        {props.children}
    </label>
);
