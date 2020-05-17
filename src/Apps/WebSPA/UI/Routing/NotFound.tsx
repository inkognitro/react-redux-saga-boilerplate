import React, { FC } from "react";
import { RouteLink } from "Packages/Common/UI/Web/Link";
import { ErrorPage } from "Apps/WebSPA/UI/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "Apps/WebSPA/Domain/Routing/Routes";

export const NotFound: FC = () => ( // todo: translation
    <ErrorPage>
        <div className="text-center">
            <h1>404 - Page not found</h1>
            <RouteLink url={createHomeRouteUrl()}>back to start</RouteLink>
        </div>
    </ErrorPage>
);
