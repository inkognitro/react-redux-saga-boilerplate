import React, { FC } from "react";
import { RouteLinkWC } from "packages/common/Router/Web";
import { ErrorPage } from "web-app/Foundation/UI/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "web-app/Routing/Domain";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/entity/common-types";

export const NotFoundWC: FC = () => (
    <ErrorPage>
        <div className="text-center">
            <h1><TranslatedText translation={{ translationId: TranslationIds.PAGE_NOT_FOUND_TITLE }} /></h1>
            <RouteLinkWC url={createHomeRouteUrl()}>
                <TranslatedText translation={{ translationId: TranslationIds.BACK_TO_START }} />
            </RouteLinkWC>
        </div>
    </ErrorPage>
);
