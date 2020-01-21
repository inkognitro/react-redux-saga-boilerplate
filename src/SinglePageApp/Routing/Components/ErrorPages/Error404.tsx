import React, {FunctionComponent} from 'react';
import {Link} from 'Common/Layout/Components/Link/Link';
import {createHomeRouteUrl} from "SinglePageApp/Routing/RouteFactory";
import {ErrorPage} from "SinglePageApp/Layout/Components/PageTypes/ErrorPage";

export type NotFoundErrorProps = {};
export const NotFoundError: FunctionComponent<NotFoundErrorProps> = () => {
    return (
        <ErrorPage>
            <div className="text-center">
                <h1>404 - Page not found</h1>
                <Link url={createHomeRouteUrl()}>
                    back to start
                </Link>
            </div>
        </ErrorPage>
    );
};