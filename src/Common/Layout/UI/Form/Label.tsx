import React, {FunctionComponent} from 'react';

export type LabelProps = {
    title: string
    formElementId?: string
};

export const Label: FunctionComponent<LabelProps> = (props) => {
    return (<label htmlFor={props.formElementId}>{props.title}</label>);
};