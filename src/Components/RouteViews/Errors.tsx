import React, {FunctionComponent} from 'react';
import {ContentPage} from 'App/Components/Common/PageTypes/components/ContentPage';
import {Link} from 'App/Components/Common/Link/containers/Link';
import {createHomeRouteUrl} from "App/Redux/Routing/routes";

export type NotFoundErrorProps = {
    contentClassName?: string,
};

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