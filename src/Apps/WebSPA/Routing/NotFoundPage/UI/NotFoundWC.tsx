import React, { FC } from "react";
import { RouteLinkWC } from "Packages/Common/Router/UI/LinkWC";
import { ErrorPage } from "Apps/WebSPA/Foundation/UI/PageTypes/ErrorPage";
import { createHomeRouteUrl } from "Apps/WebSPA/Routing/UrlFactory";
import { TranslatedTextWC, TranslationIds } from "Packages/Common/Translator";

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
