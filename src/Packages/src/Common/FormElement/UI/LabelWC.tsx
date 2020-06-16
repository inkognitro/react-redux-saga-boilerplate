import React, { FC } from "react";

export type LabelWCProps = {
  title: string;
  formElementId?: string;
};

export const LabelWC: FC<LabelWCProps> = (props) => <label htmlFor={props.formElementId}>{props.title}</label>;
