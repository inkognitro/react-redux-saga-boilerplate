import React, { FC } from 'react';
import { History } from 'history';
import { Route, Router as CommonRouter } from "packages/common/router/ui/web";
import { useCurrentUser } from "packages/common/authentication/ui";
import { ErrorPage } from "web-app/foundation/ui";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/common/types/util/domain";
import { HomePage } from './pages/home/ui';

const routes: Route[] = [
    { path: '/', exact: true, component: HomePage },
];

const NotFoundPage: FC = () => (
    <ErrorPage>
        <div className="text-center">
            <h1><TranslatedText translation={{ translationId: TranslationIds.PAGE_NOT_FOUND_TITLE }} /></h1>
        </div>
    </ErrorPage>
);

const NotAuthorizedPage: FC = () => (
    <ErrorPage>
        <div className="text-center">
            <h1><TranslatedText translation={{ translationId: TranslationIds.NOT_AUTHORIZED }} /></h1>
        </div>
    </ErrorPage>
);

export const Router: FC<{ history: History }> = (props) => {
    const currentUser = useCurrentUser();
    return (
        <CommonRouter
            currentUser={currentUser}
            history={props.history}
            routes={routes}
            notAuthorizedComponent={NotAuthorizedPage}
            notFoundComponent={NotFoundPage}
        />
    );
};
