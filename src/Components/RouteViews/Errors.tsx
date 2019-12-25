import React, {FunctionComponent} from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {Link} from 'App/Components/Common/Link/containers/Link';
import {createHomeRouteUrl} from "App/Redux/Common/Routing/routes";

export const NotFoundError: FunctionComponent<> = () => {
    return (
        <ContentPage contentClassName="text-center">
            <h1>404 - Page not found</h1>
            <Link url={createHomeRouteUrl()}>
                back to start
            </Link>
        </ContentPage>
    );
};