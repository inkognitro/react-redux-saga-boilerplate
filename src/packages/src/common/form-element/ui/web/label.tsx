import React, { FC } from 'react';

export type LabelProps = {
    isRequired?: boolean;
    for?: string;
};

export const Label: FC<LabelProps> = (props) => (
    <label htmlFor={props.for}>
        {props.children}
        {props.isRequired ? ' *' : null}
    </label>
);
