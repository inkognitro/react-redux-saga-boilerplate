import React, { FunctionComponent } from "react";

export type ErrorPageProps = {};

export const ErrorPage: FunctionComponent<ErrorPageProps> = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-sm">{props.children}</div>
        </div>
    </div>
);
