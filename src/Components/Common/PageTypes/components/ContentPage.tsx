import React, { FunctionComponent } from 'react';
import {ConnectedToasts} from 'App/Components/Common/Toaster/containers/ConnectedToasts';
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
            <ConnectedToasts />
        </React.Fragment>
    );
};