import React, { FC } from "react";

export type LabelProps = {
  title: string;
  formElementId?: string;
};

export const Label: FC<LabelProps> = (props) => <label htmlFor={props.formElementId}>{props.title}</label>;
