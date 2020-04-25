import React, { FC } from "react";
import { NavBar } from "SinglePageApp/UI/Base/NavBar";

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
