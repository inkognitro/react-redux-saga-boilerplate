import React, { FunctionComponent } from 'react';
import {ConnectedGlobalNavBar} from "App/Components/Common/NavBar/containers/ConnectedGlobalNavBar";

export type ContentPageProps = {};

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            <ConnectedGlobalNavBar />
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