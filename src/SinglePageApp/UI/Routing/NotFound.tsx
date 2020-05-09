import React, { FC } from "react";
import { RouterLink } from "Common/UI/Base/Link";
import { ErrorPage } from "SinglePageApp/UI/Base/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "SinglePageApp/Domain/Routing/Routes";

export const NotFound: FC = () => ( // todo: translation
    <ErrorPage>
        <div className="text-center">
            <h1>404 - Page not found</h1>
            <RouterLink url={createHomeRouteUrl()}>back to start</RouterLink>
        </div>
    </ErrorPage>
);
