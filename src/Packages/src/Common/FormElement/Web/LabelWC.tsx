import React, { FC } from "react";

export type LabelWCProps = {
    formElementId?: string
};

export const LabelWC: FC<LabelWCProps> = (props) => (
    <label htmlFor={props.formElementId}>
        {props.children}
    </label>
);
