import React, { FC } from "react";
import { RouterLink } from "Packages/Common/UI/Web/Link";
import { ErrorPage } from "SinglePageWebApp/UI/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "SinglePageWebApp/Domain/Routing/Routes";

export const NotFound: FC = () => ( // todo: translation
    <ErrorPage>
        <div className="text-center">
            <h1>404 - Page not found</h1>
            <RouterLink url={createHomeRouteUrl()}>back to start</RouterLink>
        </div>
    </ErrorPage>
);
