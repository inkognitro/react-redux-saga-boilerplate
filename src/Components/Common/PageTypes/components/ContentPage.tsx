import React, { FunctionComponent } from 'react';
import {ConnectedGlobalToasts} from 'App/Components/Common/Toaster/containers/ConnectedGlobalToasts';
import {ConnectedGlobalNavBar} from "App/Components/Common/NavBar/containers/ConnectedGlobalNavBar";

export type ContentPageProps = {
    contentClassName?: string,
};

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            <ConnectedGlobalNavBar />
            <div className="container">
                <div className="row">
                    <div className={'col-sm' + (props.contentClassName ? ' ' + props.contentClassName : '')}>
                        {props.children}
                    </div>
                </div>
            </div>
            <ConnectedGlobalToasts />
        </React.Fragment>
    );
};