import React, { FunctionComponent } from 'react';
import './ContentPage.scss';

export type ContentPageProps = {
    topDividedContent?: boolean,
};

export const ContentPage: FunctionComponent<ContentPageProps> = (props) => {
    return (
        <React.Fragment>
            INSERT NAVBAR HERE AGAIN!
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