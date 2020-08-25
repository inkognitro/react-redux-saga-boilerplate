import React, { FC } from "react";
import { RouteLink } from "packages/common/router/ui/web";
import { ErrorPage } from "web-app/foundation/ui/page-types/error.page";
import { createHomeRouteUrl } from "web-app/routing/domain";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/entity/common-types";

export const NotFound: FC = () => (
    <ErrorPage>
        <div className="text-center">
            <h1><TranslatedText translation={{ translationId: TranslationIds.PAGE_NOT_FOUND_TITLE }} /></h1>
            <RouteLink url={createHomeRouteUrl()}>
                <TranslatedText translation={{ translationId: TranslationIds.BACK_TO_START }} />
            </RouteLink>
        </div>
    </ErrorPage>
);
