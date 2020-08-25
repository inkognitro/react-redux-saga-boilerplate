import React, { FC } from "react";
import { Router as CommonRouter, RouterSpecification } from "packages/common/router/ui/web";
import { History } from "history";
import { homeRoute } from "../sub-modules/home-page/domain";
import { HomePage } from "../sub-modules/home-page/ui";
import { authRouteComponents } from "../sub-modules/auth-pages/ui";
import { NotFound } from "../sub-modules/not-found-page/ui";

const specification: RouterSpecification = {
    routeComponents: [
        { route: homeRoute, component: HomePage },
        ...authRouteComponents,
    ],
    defaultComponent: NotFound,
};

export const Router: FC<{ history: History }> = (props) => (
    <CommonRouter
        specification={specification}
        history={props.history}
    />
);
