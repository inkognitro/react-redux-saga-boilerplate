import React, { FunctionComponent } from 'react';
import {NavBar} from "SinglePageApp/Layout/Components/NavBar";

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