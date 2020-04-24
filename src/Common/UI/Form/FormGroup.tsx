import React, { FunctionComponent } from "react";

export const FormGroup: FunctionComponent = (props) => {
  return <div className="form-group">{props.children}</div>;
};
