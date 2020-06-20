import React, { FC } from "react";
import { NavBar } from "WebApp/Foundation/UI/NavBar";

export const ContentPage: FC = (props) => (
    <React.Fragment>
        <NavBar />
        <div className="container">
            <div className="row">
                <div className="col-sm">{props.children}</div>
            </div>
        </div>
    </React.Fragment>
);