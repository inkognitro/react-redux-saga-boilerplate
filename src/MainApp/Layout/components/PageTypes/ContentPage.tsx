import React, { FunctionComponent } from 'react';
import {NavBar} from "MainApp/Layout/components/NavBar";

export type ContentPageProps = {};

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};