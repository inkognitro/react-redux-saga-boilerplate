import React, {FunctionComponent} from 'react';
import {ContentPage} from 'MainApp/Layout/PageTypes/ContentPage';
import {Link} from 'Common/Layout/components/Link/Link';
import {createHomeRouteUrl} from "MainApp/Routing/routes";

export type NotFoundErrorProps = {};
export const NotFoundError: FunctionComponent<NotFoundErrorProps> = () => {
    return (
        <ContentPage>
            <div className="text-center">
                <h1>404 - Page not found</h1>
                <Link url={createHomeRouteUrl()}>
                    back to start
                </Link>
            </div>
        </ContentPage>
    );
};