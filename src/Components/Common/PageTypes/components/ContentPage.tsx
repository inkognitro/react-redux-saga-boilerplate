import React, { FunctionComponent } from 'react';
import Toasts from 'App/Components/Common/Toasts/containers/Toasts';
import NavBar from "App/Components/Common/NavBar/containers/NavBar";

export type ContentPageProps = {

}

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <div>
                {props.children}
            </div>
            <Toasts />
        </React.Fragment>
    );
};