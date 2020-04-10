import React, {FunctionComponent} from 'react';
import {RouterLink} from 'Common/UI/Base/Link/Link';
import {ErrorPage} from "../Base/PageTypes/ErrorPage";
import {createHomeRouteUrl} from "../../Domain/Routing/Home/Home";

export const NotFound: FunctionComponent = () => { //todo: translation
    return (
        <ErrorPage>
            <div className="text-center">
                <h1>404 - Page not found</h1>
                <RouterLink url={createHomeRouteUrl()}>
                    back to start
                </RouterLink>
            </div>
        </ErrorPage>
    );
};