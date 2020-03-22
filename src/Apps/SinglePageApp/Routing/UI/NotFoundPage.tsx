import React, {FunctionComponent} from 'react';
import {Link} from 'Common/Layout/UI/Link/Link';
import {createHomeRouteUrl} from "../Domain/Routes";
import {ErrorPage} from "../../Layout/UI/PageTypes/ErrorPage";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";

export type NotFoundErrorProps = {
    currentRouteManager: CurrentRouteManagerInterface,
};
export const NotFoundError: FunctionComponent<NotFoundErrorProps> = (props) => {
    return (
        <ErrorPage>
            <div className="text-center">
                <h1>404 - Page not found</h1>
                <Link url={createHomeRouteUrl()} currentRouteManager={props.currentRouteManager} >
                    back to start
                </Link>
            </div>
        </ErrorPage>
    );
};