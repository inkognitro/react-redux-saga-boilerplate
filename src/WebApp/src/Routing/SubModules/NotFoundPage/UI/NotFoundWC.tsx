import React, { FC } from "react";
import { RouteLinkWC } from "Packages/Common/Router/Web";
import { ErrorPage } from "WebApp/Foundation/UI/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "WebApp/Routing/UrlFactory";
import { TranslatedTextWC } from "Packages/Common/Translator/Web";
import { TranslationIds } from "Packages/Entity/CommonTypes";

export const NotFoundWC: FC = () => (
    <ErrorPage>
        <div className="text-center">
            <h1><TranslatedTextWC translation={{ translationId: TranslationIds.PAGE_NOT_FOUND_TITLE }} /></h1>
            <RouteLinkWC url={createHomeRouteUrl()}>
                <TranslatedTextWC translation={{ translationId: TranslationIds.BACK_TO_START }} />
            </RouteLinkWC>
        </div>
    </ErrorPage>
);
