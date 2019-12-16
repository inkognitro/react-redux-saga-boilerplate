import React, { FunctionComponent } from 'react';
import Toasts from 'App/Components/Common/Toaster/containers/Toaster';
import {NavBar} from "App/Components/Common/NavBar/containers/NavBar";

export type ContentPageProps = {

};

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
            <Toasts />
        </React.Fragment>
    );
};