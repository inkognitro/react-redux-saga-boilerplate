import React, { FunctionComponent } from 'react';
import {NavBar} from "SinglePageApp/Layout/Components/NavBar";
import './ContentPage.scss';

export type ContentPageProps = {
    topDividedContent?: boolean,
};

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <div className={'container' + (props.topDividedContent ? ' content-page-content-container-top-divided' : '')}>
                <div className="row">
                    <div className="col-sm">
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};