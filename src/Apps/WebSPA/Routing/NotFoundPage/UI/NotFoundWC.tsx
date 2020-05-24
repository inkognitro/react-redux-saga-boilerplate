import React, { FC } from "react";
import { RouteLink } from "Packages/Common/Router/UI/LinkWC";
import { ErrorPage } from "Apps/WebSPA/Foundation/UI/PageTypes/ErrorPage";
import {createHomeRouteUrl} from "Apps/WebSPA/Routing/UrlFactory";

export const NotFoundWC: FC = () => ( // todo: translation
    <ErrorPage>
        <div className="text-center">
            <h1>404 - Page not found</h1>
            <RouteLink url={createHomeRouteUrl()}>back to start</RouteLink>
        </div>
    </ErrorPage>
);
